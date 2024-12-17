import React, { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
import {
    Button,
    DatePicker,
    Input,
    Select,
    Spinner,
    Switcher,
    Upload,
} from '@/components/ui'
import { FaImage } from 'react-icons/fa6'
import { Controller } from 'react-hook-form'
import { RichTextEditor } from '../shared'

type Input = {
    name: string
    type: string
    label: string
    width: string
    placeholder?: string
    options?: any[]
    accept?: string
    required?: boolean
    defaultChecked?: boolean
    onChange?: (e: any) => void
    selectInputChange?: (inputValue: string) => void
    selectLoading?: boolean
    disabled?: boolean
}

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    title: string
    inputs: Input[]
    createItem: (item: Record<string, any>) => void
    createLoading: boolean
    formValues: Record<string, any>
    setFormValues: React.Dispatch<React.SetStateAction<Record<string, any>>>
}

const CreateModal = ({
    isOpen,
    setIsOpen,
    title,
    inputs,
    createItem,
    createLoading,
    formValues,
    setFormValues,
}: Props) => {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (name: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const validateFields = () => {
        const newErrors: Record<string, string> = {}
        inputs.forEach((input) => {
            if (input.type !== 'switcher' && input.required && (!formValues[input.name] || formValues[input.name] === '')) {
                newErrors[input.name] = `${input.label} is required`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault()
        if (validateFields()) {
            createItem(formValues)
        }
    }

    const renderError = (error: string | undefined) =>
        error && <p className="text-red-500 text-xs mt-0.5 ml-2">{error}</p>

    const getValue = (input: Input) => {
        if (formValues[input.name] !== undefined) return formValues[input.name]
        return input.type === 'multi-select' ? [] : ''
    }

    const renderInput = (input: Input) => {
        const error = errors[input.name]
        switch (input.type) {
            case 'text':
            case 'number':
            case 'textarea':
            case 'password':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <Input
                            aria-label={input.label}
                            placeholder={input.placeholder}
                            size="sm"
                            textArea={input.type === 'textarea'}
                            type={input.type}
                            value={getValue(input)}
                            onChange={(e) =>
                                handleInputChange(input.name, e.target.value)
                            }
                            disabled={input.disabled}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'file':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <Upload
                            draggable
                            accept={input.accept || 'image/*'}
                            onChange={(files) =>
                                handleInputChange(input.name, files)
                            }
                            disabled={input.disabled}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'select':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <Select
                            aria-label={input.label}
                            placeholder={input.placeholder}
                            options={input.options}
                            value={getValue(input)}
                            onChange={(selectedOption) => {
                                if (input.onChange) { input.onChange(selectedOption) }
                                else {
                                    handleInputChange(input.name, selectedOption)
                                }
                            }}
                            onInputChange={input.selectInputChange && input.selectInputChange}
                            isDisabled={input.disabled}
                            isLoading={input.selectLoading && input.selectLoading}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'multi-select':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <Select
                            isMulti
                            aria-label={input.label}
                            placeholder={input.placeholder}
                            options={input.options}
                            value={getValue(input)}
                            onChange={(selectedOptions) =>
                                handleInputChange(input.name, selectedOptions)
                            }
                            isDisabled={input.disabled}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'switcher':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <div className="flex justify-between">
                            <p className="font-bold ml-2 mb-1">{input.label}{
                                input.required && <span className="text-red-500">*</span>
                            }</p>
                            <Switcher
                                aria-label={input.label}
                                checked={formValues[input.name]}
                                onChange={(
                                    checked: boolean,
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleInputChange(input.name, checked)}
                                disabled={input.disabled}
                            />
                        </div>
                        {renderError(error)}
                    </div>
                )
            case 'date':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <DatePicker
                            aria-label={input.label}
                            placeholder="Select Date"
                            value={formValues[input.name] || null}
                            onChange={(date) =>
                                handleInputChange(input.name, date)
                            }
                            disabled={input.disabled}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'color':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                        <p className="font-bold ml-2 mb-1">{input.label}{
                            input.required && <span className="text-red-500">*</span>
                        }</p>
                        <input
                            type="color"
                            value={getValue(input)}
                            onChange={(e) => {
                                handleInputChange(input.name, e.target.value)
                                console.log(e.target.value)
                            }}
                            className='w-full h-10 rounded-md'
                            disabled={input.disabled}
                        />
                        {renderError(error)}
                    </div>
                )
            case 'rte':
                return (
                    <div className={`p-2 ${input.width}`} key={input.name}>
                    <p className="font-bold ml-2 mb-1">
                        {input.label}
                        {input.required && (
                            <span className="text-red-500">*</span>
                        )}
                    </p>
                    <RichTextEditor
                        content={formValues[input.name]}
                        onChange={(html) => {
                            console.log(html);
                            
                            handleInputChange(input.name, html)
                        }}
                    />
                    {renderError(error)}
                </div>
                )

            default:
                return null
        }
    }

    const onDialogClose = (e: MouseEvent) => {
        e.preventDefault()
        setFormValues({})
        setErrors({})
        setIsOpen(false)
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <div className="flex flex-col h-full justify-between">
                <h5 className="mb-4">{title}</h5>
                <form>
                    <div className="max-h-80 overflow-hidden overflow-y-auto">
                        <div className="flex flex-wrap">
                            {inputs.map((input) => renderInput(input))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6 items-center">
                        <p className="text-red-500 text-md mt-0.5 ml-2">
                            * indicates required fields
                        </p>
                        <div className="flex">
                            <Button
                                variant="plain"
                                size="sm"
                                onClick={onDialogClose}
                            >
                                Cancel
                            </Button>
                            {createLoading ? (
                                <Button
                                    variant="solid"
                                    size="sm"
                                    className="flex items-center gap-2"
                                    disabled
                                >
                                    <Spinner className="text-white" />
                                    <p>Creating...</p>
                                </Button>
                            ) : (
                                <Button
                                    variant="solid"
                                    size="sm"
                                    className="ml-2"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default CreateModal