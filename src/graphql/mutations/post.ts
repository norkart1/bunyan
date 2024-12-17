import { gql } from '@apollo/client'

export const CREATE_POST = gql`
    mutation ($createPostInput: CreatePostInput!) {
        createPost(createPostInput: $createPostInput) {
            active
            createdAt
            description
            fileURL
            id
            likes
            mahallu {
                id
                name
            }
            mahalluId
            title
            updatedAt
        }
    }
`

export const UPDATE_POST = gql`
    mutation ($updatePostInput: UpdatePostInput!) {
        updatePost(updatePostInput: $updatePostInput) {
            active
            createdAt
            description
            fileURL
            id
            likes
            mahallu {
                id
                name
            }
            mahalluId
            title
            updatedAt
        }
    }
`

export const DELETE_POST = gql`
    mutation ($removePostId: Int!) {
        removePost(id: $removePostId) {
            active
            createdAt
            description
            fileURL
            id
            likes
            mahallu {
                id
                name
            }
            mahalluId
            title
            updatedAt
        }
    }
`

export const DELETE_POSTS = gql`
    mutation ($removePostIds: [Int!]!) {
        removePosts(ids: $removePostIds) {
            active
            createdAt
            description
            fileURL
            id
            likes
            mahallu {
                id
                name
            }
            mahalluId
            title
            updatedAt
        }
    }
`
