import { gql } from '@apollo/client'

export const FIND_ALL_DISTRICTS = gql`
    query (
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
        $filters: JSON
    ) {
        districts(
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
            filters: $filters
        ) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`

export const COUNT_DISTRICTS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countDistrict(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_DISTRICT_BY_ID = gql`
    query ($id: Int!) {
        district(id: $id) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`
