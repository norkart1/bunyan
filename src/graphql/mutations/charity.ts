import { gql } from "@apollo/client";

export const CREATE_CHARITY = gql`mutation ($createCharityInput: CreateCharityInput!) {
        createCharity(createCharityInput: $createCharityInput) {
            active
            admin
            createdAt
            description
            expirationDate
            id
            mahallu {
                id
                name
            }
            posterUrl
            remarks
            startingDate
            target
            title
            updatedAt
            verified
        }
    }
`

export const UPDATE_CHARITY = gql`mutation ($updateCharityInput: UpdateCharityInput!) {
        updateCharity(updateCharityInput: $updateCharityInput) {
            active
            admin
            createdAt
            description
            expirationDate
            id
            mahallu {
                id
                name
            }
            posterUrl
            remarks
            startingDate
            target
            title
            updatedAt
            verified
        }
    }
`

export const DELETE_CHARITY = gql`mutation ($removeCharityId: Int!) {
        removeCharity(id: $removeCharityId) {
            active
            admin
            createdAt
            description
            expirationDate
            id
            mahallu {
                id
                name
            }
            posterUrl
            remarks
            startingDate
            target
            title
            updatedAt
            verified
        }
    }
`

export const DELETE_CHARITIES = gql`mutation ($removeCharityIds: [Int!]!) {
        removeCharities(ids: $removeCharityIds) {
            active
            admin
            createdAt
            description
            expirationDate
            id
            mahallu {
                id
                name
            }
            posterUrl
            remarks
            startingDate
            target
            title
            updatedAt
            verified
        }
    }
`