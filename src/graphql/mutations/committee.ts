import { gql } from '@apollo/client'

export const CREATE_COMMITTEE = gql`
    mutation ($createCommitteeInput: CreateCommitteeInput!) {
        createCommittee(createCommitteeInput: $createCommitteeInput) {
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
export const UPDATE_COMMITTEE = gql`
    mutation ($updateCommitteeInput: UpdateCommitteeInput!) {
        updateCommittee(updateCommitteeInput: $updateCommitteeInput) {
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

export const DELETE_COMMITTEE = gql`
    mutation ($removeCommitteeId: Int!) {
        removeCommittee(id: $removeCommitteeId) {
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

export const DELETE_COMMITTEES = gql`
    mutation ($removeCommitteeIds: [Int!]!) {
        removeCommittees(ids: $removeCommitteeIds) {
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
