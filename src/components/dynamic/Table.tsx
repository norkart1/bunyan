import React, { useRef, useEffect, useMemo, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Table from '@/components/ui/Table'
import Checkbox from '@/components/ui/Checkbox'
import type { ChangeEvent } from 'react'
import type { CheckboxProps } from '@/components/ui/Checkbox'
import type { Option } from './data'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'
import { Button, Pagination, Select, Skeleton, Tooltip } from '@/components/ui'
import { TbChecks, TbEye, TbPencil } from 'react-icons/tb'
import NoDataFound from '@/assets/svg/NoDataFound'
import FileNotFound from '@/assets/svg/FileNotFound'
import NoProductFound from '@/assets/svg/NoProductFound'
import { StickyFooter } from '../shared'

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onChange: (event: CheckBoxChangeEvent) => void
    indeterminate: boolean
    onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
    onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

function IndeterminateCheckbox({
    indeterminate,
    onChange,
    ...rest
}: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate])

    return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />
}

interface Props {
    name: string
    data: any[]
    selection: boolean
    dataCount: number
    extraColumns: any[]
    actionButtons: (row: any) => React.ReactNode
    pageIndex: number
    setPageIndex: React.Dispatch<React.SetStateAction<number>>
    pageSize: number
    setPageSize: React.Dispatch<React.SetStateAction<number>>
    rowSelection: {}
    setRowSelection: React.Dispatch<React.SetStateAction<{}>>
    sorting: ColumnSort[]
    setSorting: React.Dispatch<React.SetStateAction<ColumnSort[]>>
    findAllLoading: boolean
    countLoading: boolean
    deleteMany: (ids: number[]) => void
}

function RowSelection({
    name,
    data,
    selection,
    dataCount,
    extraColumns,
    actionButtons,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    rowSelection,
    setRowSelection,
    sorting,
    setSorting,
    findAllLoading,
    countLoading,
    deleteMany
}: Props) {
    const columns = useMemo<ColumnDef<typeof data>[]>(() => {
        const baseColumns: ColumnDef<typeof data>[] = [
            {
                id: 'select',
                enableSorting: false,
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            ...(extraColumns as ColumnDef<typeof data>[]),
            {
                id: 'actions',
                header: 'Actions', // Header title
                enableSorting: false, // Disable sorting for actions column
                cell: ({ row }) => actionButtons(row), // Render action buttons
            },
        ]

        if (selection) {
            return baseColumns
        } else {
            return baseColumns.filter(column => column.id !== 'select')
        }
    }, [])

    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    const table = useReactTable({
        data,
        columns,
        state: { pagination: { pageIndex, pageSize }, rowSelection, sorting },
        pageCount: Math.ceil(dataCount / pageSize), // Total pages calculation
        manualPagination: true, // Enable manual pagination
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // Add this line
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    useEffect(() => {
        table.setPageIndex(pageIndex)
        table.setPageSize(pageSize)
    }, [pageIndex, pageSize, table])

    const onPageChange = (page: number) => {
        setRowSelection({})
        setPageIndex(page - 1)
    }
    const onPageSizeChange = (value: number) => setPageSize(value)

    return (
        <div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {findAllLoading || countLoading
                        ? // Render Skeleton Rows
                        Array.from({ length: pageSize }).map((_, index) => (
                            <Tr key={index}>
                                {columns.map((_, colIndex) => (
                                    <Td key={colIndex}>
                                        <Skeleton animation={false} />
                                    </Td>
                                ))}
                            </Tr>
                        ))
                        : table.getRowModel().rows.length > 0
                            ? // Render Table Rows
                            table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                            : // Render No Data Found
                            <Tr>
                                <Td colSpan={columns.length} className="text-center">
                                    <div className="flex flex-col items-center">
                                        <FileNotFound />
                                        <p className="text-md font-medium">
                                            No data found
                                        </p>
                                    </div>
                                </Td>
                            </Tr>
                    }
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    currentPage={pageIndex + 1}
                    total={dataCount}
                    pageSize={pageSize}
                    onChange={onPageChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        options={pageSizeOption}
                        value={pageSizeOption.find(
                            (option) => option.value === pageSize,
                        )}
                        onChange={(option) =>
                            onPageSizeChange(option ? option.value : pageSize)
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default RowSelection
