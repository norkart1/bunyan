import { gql } from '@apollo/client'

export const CREATE_ZONE = gql`
    mutation ($createZoneInput: CreateZoneInput!) {
        createZone(createZoneInput: $createZoneInput) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`

export const UPDATE_ZONE = gql`
    mutation ($updateZoneInput: UpdateZoneInput!) {
        updateZone(updateZoneInput: $updateZoneInput) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`

export const DELETE_ZONE = gql`
    mutation ($id: Int!) {
        removeZone(id: $id) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`

export const DELETE_ZONES = gql`
    mutation ($ids: [Int!]!) {
        removeZones(ids: $ids) {
            id
            name
            updatedAt
            district {
                id
                name
            }
            districtId
            credential {
                username
            }
            createdAt
        }
    }
`
