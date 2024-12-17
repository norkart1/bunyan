import { gql } from '@apollo/client'

export const FIND_ALL_COMMITTEES = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        committees(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            createdAt
            id
            mahallu {
                id
                name
            }
            mahalluId
            member {
                id
                name
            }
            memberId
            position
            updatedAt
        }
    }
`

export const COUNT_COMMITTEES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countCommittee(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`
export const FIND_COMMITTEE_BY_ID = gql`
    query ($id: Int!) {
        committee(id: $id) {
            createdAt
            id
            mahallu {
                id
                name
            }
            mahalluId
            member {
                id
                name
            }
            memberId
            position
            updatedAt
        }
    }
`
