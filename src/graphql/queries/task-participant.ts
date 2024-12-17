import { gql } from '@apollo/client'

export const FIND_ALL_TASK_PARTICIPANTS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        taskParticipants(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            claimed
            createdAt
            description
            files
            id
            mahalluId
            remarks
            mahallu {
                id
                name
            }
            task {
                id
                title
                category{
                    id
                    title
                    color
                }
                points
            }
            title
            updatedAt
            verified
        }
    }
`

export const GET_MY_PARTICIPANTS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        getFromTaskParticipationOnMyVillage(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            claimed
            createdAt
            description
            files
            id
            mahalluId
            remarks
            mahallu {
                id
                name
            }
            task {
                id
                title
                description
                campaign{
                    id
                    title
                }
                category{
                    id
                    title
                    color
                }
                badge{
                    name
                    icon
                }
                points
            }
            title
            updatedAt
            verified
        }
    }
`

export const FIND_ONE_TASK_PARTICIPANT = gql`
    query ($id: Int!) {
        taskParticipant(id: $id) {
            claimed
            createdAt
            description
            files
            id
            mahalluId
            remarks
            mahallu {
                id
                name
            }
            task {
                id
                title
                description
                category {
                    id
                    title
                    color
                }
                badge {
                    name
                    icon
                }
                campaign{
                  title
                }
            }
            title
            updatedAt
            verified
        }
    }
`

export const COUNT_TASK_PARTICIPANTS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countTaskParticipant(
            filters: $filters
            relationsToFilter: $relationsToFilter
        )
    }
`
