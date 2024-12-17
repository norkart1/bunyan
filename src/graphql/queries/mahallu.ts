import { gql } from '@apollo/client'

export const FIND_ALL_MAHALLUS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        mahallus(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            contact
            createdAt
            credential {
                username
            }
            id
            place
            pinCode
            postOffice
            village {
                name
                id
                zone {
                    id
                    name
                    district {
                        id
                        name
                    }
                }
            }
            regNo
            updatedAt
            name
            totalPoints
        }
    }
`

export const FIND_MAHALLU_BY_ID = gql`
    query ($id: Int!) {
        mahallu(id: $id) {
            contact
            createdAt
            credential {
                username
            }
            id
            place
            pinCode
            postOffice
            village {
                name
                id
                zone {
                    id
                    name
                    district {
                        id
                        name
                    }
                }
            }
            regNo
            updatedAt
            name
            totalPoints
        }
    }
`

export const COUNT_MAHALLUS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countMahallu(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const GET_MAHALLU_RANKING = gql`
    query ($mahalluId: Int!) {
        getMahalluRanking(mahalluId: $mahalluId) {
            districtRanking {
                totalEntities
                rank
            }
            overallRanking {
                totalEntities
                rank
            }
            villageRanking {
                totalEntities
                rank
            }
            zoneRanking {
                totalEntities
                rank
            }
        }
    }
`
