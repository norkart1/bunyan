import { gql } from '@apollo/client'

export const CREATE_DONATION = gql`
    mutation ($createDonationInput: CreateDonationInput!) {
        createDonation(createDonationInput: $createDonationInput) {
            amount
            charity {
                id
                title
            }
            contact
            createdAt
            donatedAt
            guest
            id
            mahallu {
                id
                name
            }
            member {
                id
            }
            name
            status
            updatedAt
        }
    }
`

export const UPDATE_DONATION = gql`
    mutation ($updateDonationInput: UpdateDonationInput!) {
        updateDonation(updateDonationInput: $updateDonationInput) {
            amount
            charity {
                id
                title
            }
            contact
            createdAt
            donatedAt
            guest
            id
            mahallu {
                id
                name
            }
            member {
                id
            }
            name
            status
            updatedAt
        }
    }
`

export const DELETE_DONATION = gql`
    mutation ($removeDonationId: Int!) {
        removeDonation(id: $removeDonationId) {
            amount
            charity {
                id
                title
            }
            contact
            createdAt
            donatedAt
            guest
            id
            mahallu {
                id
                name
            }
            member {
                id
            }
            name
            status
            updatedAt
        }
    }
`

export const DELETE_DONATIONS = gql`
    mutation ($removeDonationIds: [Int!]!) {
        removeDonations(ids: $removeDonationIds) {
            amount
            charity {
                id
                title
            }
            contact
            createdAt
            donatedAt
            guest
            id
            mahallu {
                id
                name
            }
            member {
                id
            }
            name
            status
            updatedAt
        }
    }
`
