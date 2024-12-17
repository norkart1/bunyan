import React, { useEffect, useState } from 'react'
import Table from '@/components/ui/Table'
import THead from '@/components/ui/Table/THead'
import { AdaptiveCard, Container, DebouceInput, GrowShrinkValue } from '@/components/shared'
import TBody from '@/components/ui/Table/TBody'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import Td from '@/components/ui/Table/Td'
import { useMutation, useQuery } from '@apollo/client'
import { FIND_ALL_POSTS } from '@/graphql/queries/post'
import { Post } from '@/generated/graphql'
import { Button, Tag } from '@/components/ui'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import { useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'

export default function PostsTable() {

    const [search, setSearch] = React.useState('')
    const [posts, setPosts] = React.useState<Post[]>([])
    const user = useSessionUser(state => state.user)
    const { id } = useParams<{ id: string }>()

    const { data, error, loading, refetch } = useQuery(FIND_ALL_POSTS, {
        variables: {
            limit: 1000,
            offset: 0,
            orderBy: {},
            relationsToFilter: {},
            filters: {
                title: { contains: search, mode: 'insensitive' },
                mahalluId: parseInt(id as string)
            }
        }
    })

    useEffect(() => {
        if (data) {
            setPosts(data.posts)
        }
    }, [data])

    return (
        <>
            <DebouceInput
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="m-4 border border-gray-400 rounded-2xl ">
                <AdaptiveCard>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Image</Th>
                                <Th>Likes</Th>
                                <Th>Active</Th>
                            </Tr>
                        </THead>
                        {
                            loading ? <TBody>
                                {Array.from({ length: 5 }).map((_, index) => ( // Replace '5' with the number of skeleton rows you want
                                    <Tr key={index} className="animate-pulse">
                                        {/* Title Column Skeleton */}
                                        <Td>
                                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Category Button Skeleton */}
                                        <Td>
                                            <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Status Button Skeleton */}
                                        <Td>
                                            <div className="h-6 w-full bg-gray-300 rounded"></div>
                                        </Td>

                                        {/* Points Column Skeleton */}
                                        <Td>
                                            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                                        </Td>
                                    </Tr>
                                ))}
                            </TBody>
                                : posts.length > 0 ? <TBody>
                                    {
                                        posts.map((post, index) => (
                                            <Tr key={post.id}>
                                                <Td>{post.title}</Td>
                                                <Td>
                                                    <img
                                                        src={post.fileURL as string}
                                                        alt={post.title as string}
                                                        className="w-10 h-10 rounded-lg"
                                                    />
                                                </Td>
                                                <Td>{post.likes}</Td>
                                                <Td>
                                                    <Tag className={post.active ? 'bg-green-400' : 'bg-red-400'}>
                                                        {post.active ? 'Active' : 'Inactive'}
                                                    </Tag>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </TBody> : error ? <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">{error.message}</Td>
                                    </Tr>
                                </TBody> : <TBody>
                                    <Tr>
                                        <Td colSpan={4} className="text-center">No posts found</Td>
                                    </Tr>
                                </TBody>
                        }
                    </Table>
                </AdaptiveCard>
            </div>
        </>
    )
}
