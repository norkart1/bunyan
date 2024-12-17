import { gql } from "@apollo/client"

export const CREATE_BADGE = gql`
    mutation ($createBadgeInput: CreateBadgeInput!) {
        createBadge(createBadgeInput: $createBadgeInput) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`

export const UPDATE_BADGE = gql`
    mutation ($updateBadgeInput: UpdateBadgeInput!) {
        updateBadge(updateBadgeInput: $updateBadgeInput) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`

export const DELETE_BADGE = gql`
    mutation ($removeBadgeId: Int!) {
        removeBadge(id: $removeBadgeId) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`

export const DELETE_BADGES = gql`
    mutation ($removeBadgeIds: [Int!]!) {
        removeBadges(ids: $removeBadgeIds) {
            createdAt
            icon
            id
            name
            updatedAt
            year {
                id
                name
            }
        }
    }
`

