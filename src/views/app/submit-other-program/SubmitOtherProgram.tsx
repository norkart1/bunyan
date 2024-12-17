import { useSessionUser } from '@/store/authStore'
import { cloudinaryUploadAny } from '@/utils/cloudinaryUpload'
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiDocument, HiOutlineCloudUpload } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { Button, Card, Input, Select, Upload } from '@/components/ui'
import FilePdf from '@/assets/svg/files/FilePdf'
import FileDoc from '@/assets/svg/files/FileDoc'
import { CREATE_OTHER_PROGRAM } from '@/graphql/mutations/other-program'
import { FIND_ALL_TASK_CATEGORIES } from '@/graphql/queries/task-category'
import { TaskCategory } from '@/generated/graphql'

const SubmitOtherProgram = () => {
    const user = useSessionUser((state) => state.user)

    const [categories, setCategories] = React.useState<TaskCategory[]>([])

    const [submitLoading, setSubmitLoading] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [categoryId, setCategoryId] = React.useState<Record<string, any>>({})
    const [files, setFiles] = React.useState<File[]>([])

    const { data, error, loading } = useQuery(FIND_ALL_TASK_CATEGORIES, {
        variables: {
            limit: 100,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {},
        }
    })

    useEffect(() => {
        if (data) {
            setCategories(data.taskCategories)
        }
    }, [data])

    const [submitOtherProgram] = useMutation(CREATE_OTHER_PROGRAM, {
        onCompleted: () => {
            toast.success('Other Program submitted successfully', {
                id: 'toastId',
                duration: 5000,
            })

        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create Other Program'
            toast.error(message, { id: 'toastId', duration: 5000 })
        },
    })

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!title || !description || files.length === 0 || !categoryId.value) {
            toast.error('Please fill all the fields')
            return
        }

        setSubmitLoading(true)
        try {
            const uploaded = await Promise.all(files.map(cloudinaryUploadAny))
            await submitOtherProgram({
                variables: {
                    createOtherProgramInput: {
                        title,
                        description,
                        files: uploaded,
                        categoryId: categoryId.value,
                        mahalluId: user?.mahalluId,
                    },
                },
            })
        } catch (error) {
            toast.error('Failed to upload files or submit other program')
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Create Other Program</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title of the task<span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the title of your task"
                                value={title}
                                onChange={(e: any) => setTitle(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description<span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="description"
                                textArea
                                placeholder="Describe your task submission"
                                value={description}
                                onChange={(e: any) => setDescription(e.target.value)}
                                className="w-full min-h-[120px]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload your documents<span className="text-red-500">*</span>
                            </label>
                            <Upload
                                draggable
                                multiple
                                onChange={(files) =>
                                    setFiles(files as File[])
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Select the category of the task<span className="text-red-500">*</span>
                            </label>
                            <Select
                                id="category"
                                value={categoryId}
                                onChange={(selectedOption) => setCategoryId(selectedOption)}
                                placeholder="Select the category of the program"
                                className="w-full"
                                options={
                                    categories.map((category) => ({
                                        label: category.title,
                                        value: category.id,
                                    }))
                                }
                            />
                        </div>
                        <Button
                            className="w-full "
                            variant='solid'
                            loading={submitLoading}
                            disabled={submitLoading}
                            onClick={handleSubmit}
                        >
                            Submit Task
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SubmitOtherProgram

