import { gql } from '@apollo/client'

export const CREATE_DISTRICT = gql`
    mutation ($createDistrictInput: CreateDistrictInput!) {
        createDistrict(createDistrictInput: $createDistrictInput) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`

export const UPDATE_DISTRICT = gql`
    mutation ($updateDistrictInput: UpdateDistrictInput!) {
        updateDistrict(updateDistrictInput: $updateDistrictInput) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`

export const DELETE_DISTRICT = gql`
    mutation ($removeDistrictId: Int!) {
        removeDistrict(id: $removeDistrictId) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`

export const DELETE_DISTRICTS = gql`
    mutation ($removeDistrictIds: [Int!]!) {
        removeDistricts(ids: $removeDistrictIds) {
            id
            name
            credential {
                username
            }
            createdAt
            updatedAt
        }
    }
`
