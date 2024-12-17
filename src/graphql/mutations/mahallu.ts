import { gql } from '@apollo/client'

export const CREATE_MAHALLU = gql`
    mutation ($createMahalluInput: CreateMahalluInput!) {
        createMahallu(createMahalluInput: $createMahalluInput) {
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
            }
            regNo
            updatedAt
            name
        }
    }
`

export const UPDATE_MAHALLU = gql`
    mutation ($updateMahalluInput: UpdateMahalluInput!) {
        updateMahallu(updateMahalluInput: $updateMahalluInput) {
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
            }
            regNo
            updatedAt
            name
        }
    }
`

export const DELETE_MAHALLU = gql`
    mutation ($removeMahalluId: Int!) {
        removeMahallu(id: $removeMahalluId) {
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
            }
            regNo
            updatedAt
            name
        }
    }
`

export const DELETE_MAHALLUS = gql`
    mutation ($removeMahalluIds: [Int!]!) {
        removeMahallus(ids: $removeMahalluIds) {
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
            }
            regNo
            updatedAt
            name
        }
    }
`
