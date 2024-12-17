import { gql } from '@apollo/client'

export const FIND_ALL_VILLAGES = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        villages(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`

export const FIND_ONE_VILLAGE = gql`
    query ($id: Int!) {
        village(id: $id) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`

export const COUNT_VILLAGES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countVillage(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`
