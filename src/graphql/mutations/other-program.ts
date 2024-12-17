import { gql } from '@apollo/client'

export const CREATE_OTHER_PROGRAM = gql`
    mutation CreateOtherProgram(
        $createOtherProgramInput: CreateOtherProgramInput!
    ) {
        createOtherProgram(createOtherProgramInput: $createOtherProgramInput) {
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

export const UPDATE_OTHER_PROGRAM = gql`
    mutation UpdateOtherProgram(
        $updateOtherProgramInput: UpdateOtherProgramInput!
    ) {
        updateOtherProgram(updateOtherProgramInput: $updateOtherProgramInput) {
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

export const DELETE_OTHER_PROGRAM = gql`
    mutation DeleteOtherProgram($id: Int!) {
        deleteOtherProgram(id: $id) {
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

export const DELETE_OTHER_PROGRAMS = gql`
    mutation ($ids: [Int!]!) {
        deleteOtherPrograms(ids: $ids) {
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

export const VERIFY_OTHER_PROGRAM = gql`
    mutation VerifyOtherProgram($id: Int!, $points: Int!) {
        verifyOtherProgram(id: $id, points: $points) {
            verified
        }
    }
`

export const CLAIM_OTHER_PROGRAM = gql`
    mutation ClaimOtherProgram($id: Int!) {
        claimOtherProgram(id: $id) {
            claimed
        }
    }
`
