import { gql } from '@apollo/client'

export const FIND_ALL_TASK_CATEGORIES = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        taskCategories(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            active
            color
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`

export const COUNT_TASK_CATEGORIES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countTaskCategory(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`