import { gql } from '@apollo/client'

export const FIND_ALL_BADGES = gql`
    query (
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
        $filters: JSON
    ) {
        badges(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
            filters: $filters
        ) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`

export const COUNT_BADGES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countBadge(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_BADGE_BY_ID = gql`
    query ($id: Int!) {
        badge(id: $id) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`
