import { gql } from '@apollo/client'

export const CREATE_VILLAGE = gql`
    mutation ($createVillageInput: CreateVillageInput!) {
        createVillage(createVillageInput: $createVillageInput) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`

export const UPDATE_VILLAGE = gql`
    mutation ($updateVillageInput: UpdateVillageInput!) {
        updateVillage(updateVillageInput: $updateVillageInput) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`

export const DELETE_VILLAGE = gql`
    mutation ($id: Int!) {
        removeVillage(id: $id) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`

export const DELETE_VILLAGES = gql`
    mutation ($ids: [Int!]!) {
        removeVillages(ids: $ids) {
            createdAt
            id
            name
            updatedAt
            zone {
                id
                name
                district {
                    id
                    name
                }
            }
            zoneId
            credential {
                username
            }
        }
    }
`
