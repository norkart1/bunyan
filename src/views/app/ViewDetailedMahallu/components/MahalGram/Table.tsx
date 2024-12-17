import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
// import useCustomerList from '../hooks/useCustomerList'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye, TbTrash } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
// import type { Customer } from '../types'
import type { TableQueries } from '@/@types/common'

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: any }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="round" src={row.img} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/customer-details/${row.id}`}
            >
                {row.name}
                <br />
                <span className='!text-xs font-normal'>{row.name}</span>
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold text-blue-600`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
            
            <Tooltip title="Hide">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold text-red-600`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const CustomerListTable = () => {
    const navigate = useNavigate()

    // const {
    //     customerList,
    //     customerListTotal,
    //     tableData,
    //     isLoading,
    //     setTableData,
    //     setSelectAllCustomer,
    //     setSelectedCustomer,
    //     selectedCustomer,
    // } = useCustomerList()

    const customerList = [
        {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'Pookkolathur',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        },
        {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 8439534,
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        }, {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },
        {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },{
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            likes : 'f',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        }, {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            like : 'Pookkolathur',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        }, {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            like : 'Pookkolathur',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        }, {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            like : 'Pookkolathur',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        }, {
            id: '1',
            name: 'Pookkolathur Mahallu',
            email: 'abcd@ab.com',
            like : 'Pookkolathur',
        },
        {
            id: '2',
            name: 'Pookkolathur Mahallu',
            email: 'aaa@a.c',
        },
    ]
    const isLoading = false
    const customerListTotal = customerList.length
        const [tableData, setTableData] = useState<TableQueries>({
            pageIndex: 1,
            pageSize: 10,
        })
    const [selectedCustomer, setSelectedCustomer] = useState<any[]>([])
    const [selectAllCustomer, setSelectAllCustomer] = useState<any[]>([])



    const handleEdit = (customer: any) => {
        navigate(`/mahallu-details?tab=mahalgram&action=delete&id=${customer.id}`)
    }

    const handleViewDetails = (customer: any) => {
        navigate(`/mahallu-details?tab=mahalgram&action=view&id=${customer.id}`)
    }

    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                header: 'Title',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                id: 'email',
                cell: (props) => {
                    return <span>{props.row.original.email}</span>
                }
            },
           
            {
                header: 'Likes',
                cell: (props) => {
                    return <span>{props.row.original.likes}</span>
                },
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: any) => {
        // setSelectedCustomer(checked, row)
        setSelectedCustomer(checked ? [row.original] : [])
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<any>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={customerList}
            noData={!isLoading && customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: customerListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
