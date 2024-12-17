import { gql } from '@apollo/client'

export const FIND_ALL_YEARS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        years(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            id
            name
            type
            createdAt
            updatedAt
        }
    }
`

export const COUNT_YEARS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countYear(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_YEAR_BY_ID = gql`
    query ($id: Int!) {
        year(id: $id) {
            id
            name
            type
            createdAt
            updatedAt
        }
    }
`
