import { gql } from '@apollo/client'

export const FIND_ALL_ZONES = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        zones(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`

export const FIND_ONE_ZONE = gql`
    query ($id: Int!) {
        zone(id: $id) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`

export const COUNT_ZONES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countZone(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`
