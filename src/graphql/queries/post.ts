import { gql } from '@apollo/client'

export const FIND_ALL_POSTS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        posts(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
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

export const COUNT_POSTS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countPost(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_POST_BY_ID = gql`
    query ($id: Int!) {
        post(id: $id) {
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
