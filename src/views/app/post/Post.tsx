import DownloadButton from '../../../components/dynamic/DownloadButton'
import Table from '../../../components/dynamic/Table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { ColumnDef, ColumnSort, Row } from '@tanstack/react-table'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { FaPlusCircle } from 'react-icons/fa'
import { TbChecks, TbEye, TbPencil, TbSearch, TbTrash } from 'react-icons/tb'
import CreateModal from '@/components/dynamic/CreateModal'
import { FaImage } from 'react-icons/fa6'
import UpdateModal from '@/components/dynamic/UpdateModal'
import DeleteModal from '@/components/dynamic/DeleteModal'
import { Post, RoleEnum } from '@/generated/graphql'
import { useMutation, useQuery } from '@apollo/client'
import {
    COUNT_POSTS,
    FIND_ALL_POSTS,
} from '@/graphql/queries/post'
import {
    CREATE_POST,
    DELETE_POST,
    DELETE_POSTS,
    UPDATE_POST,
} from '@/graphql/mutations/post'
import ViewModal from '@/components/dynamic/ViewModal'
import toast from 'react-hot-toast'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DebouceInput from '@/components/shared/DebouceInput'
import { useLocation } from 'react-router-dom'
import { convertToYYYYMMDD } from '@/utils/dateHelper'
import { StickyFooter } from '@/components/shared'
import { cloudinaryUpload } from '@/utils/cloudinaryUpload'
import { useSessionUser } from '@/store/authStore'
import { Tag } from '@/components/ui'

export default function Posts() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const user = useSessionUser((state) => state.user)

    const [formValues, setFormValues] = useState<Record<string, any>>({})
    const [postCount, setPostCount] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState({
        findAll: false,
        count: false,
        create: false,
        update: false,
        delete: false,
        deleteMany: false
    });
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [search, setSearch] = useState('');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleteManyOpen, setIsDeleteManyOpen] = useState(false);
    const [toView, setToView] = useState<Post | null>(null);
    const [toUpdate, setToUpdate] = useState<Post | null>(null);
    const [toDelete, setToDelete] = useState<Post | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [sorting, setSorting] = useState<ColumnSort[]>([]);

    const urlPageIndex = parseInt(searchParams.get('page') || '1');
    const urlPageSize = parseInt(searchParams.get('limit') || '10');
    const validatedPageIndex = isNaN(urlPageIndex) || urlPageIndex <= 0 ? 0 : urlPageIndex - 1;
    const validatedPageSize = isNaN(urlPageSize) || urlPageSize <= 0 ? 10 : urlPageSize;
    const [pageIndex, setPageIndex] = useState(validatedPageIndex);
    const [pageSize, setPageSize] = useState(validatedPageSize);

    const { refetch: refetchFindAll, data: findAllData, error: findAllError, loading: findAllLoading } = useQuery(FIND_ALL_POSTS, {
        variables: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            orderBy: sorting.length > 0 ? { field: sorting[0].id, direction: sorting[0].desc ? 'desc' : 'asc' } : {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
        },
    });

    const { refetch: refetchCount, data: countData, error: countError, loading: countLoading } = useQuery(COUNT_POSTS, {
        variables: {
            filters: {
                title: { contains: search, mode: 'insensitive' },
            },
            relationsToFilter: {},
        },
    });

    useEffect(() => {
        if (findAllData) {
            setPosts(findAllData.posts);
        }
        if (countData) {
            setPostCount(countData.countPost);
        }
        if (findAllError || countError) {
            setErrorMessage(findAllError?.message || countError?.message || 'An unknown error occurred.');
        }
        setLoading((prev) => ({
            ...prev,
            findAll: findAllLoading,
            count: countLoading,
        }));
    }, [findAllData, countData, findAllError, countError, findAllLoading, countLoading]);

    useEffect(() => {
        if (postCount === 0) return;
        const totalPages = Math.ceil(postCount / pageSize);
        const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
        if (adjustedPageIndex !== pageIndex) {
            setPageIndex(adjustedPageIndex);
        }
        searchParams.set('page', (adjustedPageIndex + 1).toString());
        searchParams.set('limit', pageSize.toString());
        window.history.replaceState(null, '', `${location.pathname}?${searchParams.toString()}`);
    }, [pageIndex, pageSize, postCount]);

    useEffect(() => {
        console.log('rowSelection', rowSelection)
        console.log(
            Object.keys(rowSelection).map((key) => posts[Number(key)]?.id),
        )
        console.log('sorting', sorting)
    }, [rowSelection, sorting])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const extraColumns = useMemo<ColumnDef<Post>[]>(() => {
        return [
            {
                header: 'Title',
                accessorKey: 'title',
                enableSorting: true,
            },
            {
                header: 'File URL',
                accessorKey: 'fileURL',
                enableSorting: true,
                cell: ({ row }) => (
                    <img
                        src={row.original.fileURL as string}
                        alt={row.original.title as string}
                        className="w-10 h-10 rounded-lg"
                    />
                )
            },
            {
                header: 'Likes',
                accessorKey: 'likes',
                enableSorting: true,
            },
            {
                header: 'Active',
                accessorKey: 'active',
                enableSorting: true,
                cell: ({ row }) => (
                    <Tag className={row.original.active ? 'bg-green-400' : 'bg-red-400'}>
                        {row.original.active ? 'Active' : 'Inactive'}
                    </Tag>
                )
            },

        ]
    }, [])

    const updateStateAfterRefetch = async () => {
        const { data: updatedFindAllData } = await refetchFindAll();
        const { data: updatedCountData } = await refetchCount();
        if (updatedFindAllData) {
            setPosts(updatedFindAllData.posts);
        }
        if (updatedCountData) {
            setPostCount(updatedCountData.countPost);
            const totalPages = Math.ceil(updatedCountData.countPost / pageSize);
            const adjustedPageIndex = pageIndex >= totalPages ? totalPages - 1 : pageIndex;
            setPageIndex(adjustedPageIndex >= 0 ? adjustedPageIndex : 0);
        }
    };

    const createInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Enter Post Title',
            width: 'w-full',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Post Description',
            width: 'w-full',
            required: true,
        },
        {
            name: 'fileURL',
            label: 'File URL',
            type: 'file',
            placeholder: 'Enter Post File URL',
            width: 'w-full',
            required: true,
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            placeholder: 'Enter Post Active',
            width: 'w-full',
            required: true,
        }
    ]

    const [createPost] = useMutation(CREATE_POST, {
        refetchQueries: [{ query: FIND_ALL_POSTS }, { query: COUNT_POSTS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Post created successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsCreateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to create post';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleCreate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            create: true,
        })

        await cloudinaryUpload(formData.fileURL[0]).then((url) => {

            createPost({
                variables: {
                    createPostInput: {
                        title: formData.title,
                        description: formData.description,
                        fileURL: url,
                        active: formData.active,
                        mahalluId: user?.mahalluId
                    },
                },
            }).finally(() => setLoading({ ...loading, create: false }))

        }).catch((error) => {
            toast.error('Failed to upload image', { id: 'toastId', duration: 5000 });
            setLoading({ ...loading, create: false })
        })

    }

    const updateInputs = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Enter Post Title',
            width: 'w-full',
            required: true,
            value: toUpdate?.title,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Post Description',
            width: 'w-full',
            required: true,
            value: toUpdate?.description,
        },
        {
            name: 'fileURL',
            label: 'File URL',
            type: 'file',
            placeholder: 'Enter Post File URL',
            width: 'w-full',
        },
        {
            name: 'active',
            label: 'Active',
            type: 'switcher',
            placeholder: 'Enter Post Active',
            width: 'w-full',
            required: true,
            value: toUpdate?.active,
        }
    ]

    const [updatePost] = useMutation(UPDATE_POST, {
        refetchQueries: [{ query: FIND_ALL_POSTS }, { query: COUNT_POSTS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Post updated successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsUpdateOpen(false);
            setFormValues({})
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to update post';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    async function handleUpdate(formData: Record<string, any>) {
        setLoading({
            ...loading,
            update: true,
        })
        if (formData.fileURL) {
            await cloudinaryUpload(formData.fileURL[0]).then((url) => {

                updatePost({
                    variables: {
                        updatePostInput: {
                            id: toUpdate?.id,
                            title: formData.title,
                            description: formData.description,
                            fileURL: url,
                            active: formData.active,
                            mahalluId: user?.mahalluId
                        },
                    },
                }).finally(() => setLoading({ ...loading, update: false }))
            }).catch((error) => {
                toast.error('Failed to upload image', { id: 'toastId', duration: 5000 });
                setLoading({ ...loading, update: false })
            })
        } else {
            updatePost({
                variables: {
                    updatePostInput: {
                        id: toUpdate?.id,
                        title: formData.title,
                        description: formData.description,
                        fileURL: toUpdate?.fileURL,
                        active: formData.active,
                        mahalluId: user?.mahalluId
                    },
                },
            }).finally(() => setLoading({ ...loading, update: false }))
        }
    }

    const [deletePost] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: FIND_ALL_POSTS }, { query: COUNT_POSTS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Post deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setIsDeleteOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete post';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    });

    function handleDelete(id: number) {
        setLoading({
            ...loading,
            delete: true,
        })
        deletePost({
            variables: {
                removePostId: id,
            },
        }).finally(() => setLoading({ ...loading, delete: false }))
    }

    const [deletePosts] = useMutation(DELETE_POSTS, {
        refetchQueries: [{ query: FIND_ALL_POSTS }, { query: COUNT_POSTS }],
        awaitRefetchQueries: true,
        onCompleted: (data) => {
            toast.success('Posts deleted successfully', { id: 'toastId', duration: 5000 });
            updateStateAfterRefetch()
            setRowSelection({});
            setIsDeleteManyOpen(false);
        },
        onError: (error) => {
            const message = error.graphQLErrors[0]?.message || 'Failed to delete posts';
            setErrorMessage(message);
            toast.error(message, { id: 'toastId', duration: 5000 });
        },
    })

    function handleDeleteMany(ids: number[]) {
        setLoading({
            ...loading,
            deleteMany: true,
        })
        deletePosts({
            variables: {
                removePostIds: ids,
            },
        }).finally(() => setLoading({ ...loading, deleteMany: false }))
    }

    return (
        <>
            {isViewOpen && toView && (
                <ViewModal
                    isOpen={isViewOpen}
                    setIsOpen={setIsViewOpen}
                    title="Post Details"
                >
                    <div className="bg-gray-100 shadow rounded-lg px-2 py-1 w-full">
                        <div className="flex flex-col gap-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Title:</span>
                                <span>{toView.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">File:</span>
                                <img
                                    src={toView.fileURL as string}
                                    alt={toView.title as string}
                                    className="w-10 h-10 rounded-lg"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Likes</span>
                                <span>{toView.likes}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Created At:</span>
                                <span>{convertToYYYYMMDD(toView.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Updated At:</span>
                                <span>{convertToYYYYMMDD(toView.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </ViewModal>
            )}
            {isCreateOpen && (
                <CreateModal
                    formValues={formValues}
                    setFormValues={setFormValues}
                    isOpen={isCreateOpen}
                    setIsOpen={setIsCreateOpen}
                    title="Create Post"
                    inputs={createInputs}
                    createItem={handleCreate}
                    createLoading={loading.create}
                />
            )}
            {isUpdateOpen && toUpdate && (
                <UpdateModal
                    isOpen={isUpdateOpen}
                    setIsOpen={setIsUpdateOpen}
                    title="Update Post"
                    inputs={updateInputs}
                    updateItem={handleUpdate}
                    updateLoading={loading.update}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />
            )}
            {isDeleteOpen && toDelete && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    setIsOpen={setIsDeleteOpen}
                    title="Delete Post"
                    description={`Are you sure you want to delete ${toDelete?.title} post?, 
                    This action cannot be undone.`}
                    toDeleteId={toDelete?.id || 0}
                    deleteItem={handleDelete}
                    deleteLoading={loading.delete}
                />
            )}
            {isDeleteManyOpen && (
                <DeleteModal
                    isOpen={isDeleteManyOpen}
                    setIsOpen={setIsDeleteManyOpen}
                    title="Delete Posts"
                    description={`Are you sure you want to delete selected posts?, 
                    This action cannot be undone.`}
                    toDeleteIds={Object.keys(rowSelection).map((key) => posts[Number(key)]?.id)}
                    deleteItems={handleDeleteMany}
                    deleteLoading={loading.deleteMany}
                />
            )}
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Posts</h3>
                            <div className="flex gap-2">
                                <DownloadButton data={posts} />
                                <Button
                                    variant="solid"
                                    className="flex items-center"
                                    onClick={() => {
                                        setIsCreateOpen(true)
                                        setFormValues({
                                            ...formValues,
                                            active: false
                                        })
                                    }}
                                >
                                    <FaPlusCircle className="mr-1" />
                                    Add New
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <DebouceInput
                                placeholder="Search"
                                suffix={<TbSearch className="text-lg" />}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Table
                            selection={true}
                            name="post"
                            data={posts}
                            dataCount={postCount}
                            findAllLoading={loading.findAll}
                            countLoading={loading.count}
                            extraColumns={extraColumns}
                            rowSelection={rowSelection}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            setRowSelection={setRowSelection}
                            sorting={sorting}
                            setSorting={setSorting}
                            deleteMany={handleDeleteMany}
                            actionButtons={(row: Row<Post>) => (
                                <div className="flex items-center gap-3">
                                    <Tooltip title="View">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToView(row.original)
                                                setIsViewOpen(true)
                                            }}
                                        >
                                            <TbEye />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToUpdate(row.original)
                                                setIsUpdateOpen(true)
                                            }}
                                        >
                                            <TbPencil />
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <div
                                            className={`text-xl cursor-pointer select-none font-semibold`}
                                            role="button"
                                            onClick={() => {
                                                setToDelete(row.original)
                                                setIsDeleteOpen(true)
                                            }}
                                        >
                                            <TbTrash />
                                        </div>
                                    </Tooltip>
                                </div>
                            )}
                        />
                    </div>
                </AdaptiveCard>
                {Object.keys(rowSelection).length > 0 &&
                    <StickyFooter
                        className=" flex items-center justify-between py-4 bg-white dark:bg-gray-800"
                        stickyClass="-mx-4 sm:-mx-8 border-t border-gray-200 dark:border-gray-700 px-8"
                        defaultClass="container mx-auto px-8 rounded-xl border border-gray-200 dark:border-gray-600 mt-4 w-full"
                    >
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between">
                                <span>
                                    {Object.keys(rowSelection).length > 0 && (
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg text-primary">
                                                <TbChecks />
                                            </span>
                                            <span className="font-semibold flex items-center gap-1">
                                                <span className="heading-text">
                                                    {Object.keys(rowSelection).length}{' '}
                                                    {Object.keys(rowSelection).length > 1 ? 'post' + 's' : 'post'}
                                                </span>
                                                <span>selected</span>
                                            </span>
                                        </span>
                                    )}
                                </span>

                                <div className="flex items-center">

                                    <Button
                                        size="sm"
                                        className='mr-3 button bg-white border dark:bg-gray-700 dark:border-gray-700 dark:ring-white dark:hover:border-white hover:ring-1 dark:hover:text-white dark:hover:bg-transparent dark:text-gray-100 h-10 rounded-xl px-3 py-2 text-sm button-press-feedback border-gray-400 ring-1 ring-gray-400 text-gray-500 hover:border-gray-500 hover:ring-gray-500 hover:text-gray-500'
                                        onClick={() =>
                                            setRowSelection({})
                                        }
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error'
                                        }
                                        onClick={() => setIsDeleteManyOpen(true)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </StickyFooter>
                }
            </Container>
        </>
    )
}
