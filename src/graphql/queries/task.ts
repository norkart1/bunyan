import { gql } from '@apollo/client'

export const FIND_ALL_TASKS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        tasks(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            active
            badge {
                id
                name
                icon
            }
            badgeId
            campaign {
                id
                title
            }
            campaignId
            category {
                id
                title
                color
            }
            categoryId
            createdAt
            description
            dueDate
            id
            points
            startDate
            title
            updatedAt
            verified
            year {
                id
                name
            }
            participants {
                id
                claimed
                verified
                remarks
            }
            yearId
        }
    }
`

export const FIND_ONE_TASK = gql`
    query ($id: Int!) {
        task(id: $id) {
            active
            badge {
                name
                icon
            }
            badgeId
            campaign {
                title
            }
            campaignId
            category {
                title
                color
            }
            categoryId
            createdAt
            description
            dueDate
            id
            participants {
                id
                title
                description
                files
                verified
                claimed
            }
            points
            startDate
            title
            updatedAt
            verified
            year {
                name
            }
            yearId
        }
    }
`

export const COUNT_TASKS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countTask(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`
