import { gql } from '@apollo/client'

export const FIND_ALL_OTHER_PROGRAMS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        otherPrograms(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            category {
                title
                description
                color
            }
            categoryId
            claimed
            createdAt
            description
            files
            id
            mahallu {
                name
            }
            mahalluId
            points
            remarks
            title
            updatedAt
            verified
        }
    }
`

export const COUNT_OTHER_PROGRAMS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countOtherProgram(
            filters: $filters
            relationsToFilter: $relationsToFilter
        )
    }
`

export const FIND_OTHER_PROGRAM_BY_ID = gql`
    query ($id: Int!) {
        otherProgram(id: $id) {
            category {
                title
                description
                color
            }
            categoryId
            claimed
            createdAt
            description
            files
            id
            mahallu {
                name
            }
            mahalluId
            points
            remarks
            title
            updatedAt
            verified
        }
    }
`

export const GET_MY_OTHER_PROGRAMS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        getFromOtherProgramsOnMyVillage(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            category {
                title
                description
                color
            }
            categoryId
            claimed
            createdAt
            description
            files
            id
            mahallu {
                name
            }
            mahalluId
            points
            remarks
            title
            updatedAt
            verified
        }
    }
`
