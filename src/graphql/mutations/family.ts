import { gql } from '@apollo/client'

export const CREATE_FAMILY = gql`
    mutation ($createFamilyInput: CreateFamilyInput!) {
        createFamily(createFamilyInput: $createFamilyInput) {
            block
            createdAt
            houseHolder
            houseName
            houseNumber
            houseType
            id
            mahallu {
                id
                name
            }
            mobile
            name
            regNo
            panchayathMunicipality
            panchayathWardNo
            place
            rationCardType
            updatedAt
            wardHouseNo
            whatsapp
        }
    }
`

export const UPDATE_FAMILY = gql`
    mutation ($updateFamilyInput: UpdateFamilyInput!) {
        updateFamily(updateFamilyInput: $updateFamilyInput) {
            block
            createdAt
            houseHolder
            houseName
            houseNumber
            houseType
            id
            mahallu {
                id
                name
            }
            mobile
            name
            regNo
            panchayathMunicipality
            panchayathWardNo
            place
            rationCardType
            updatedAt
            wardHouseNo
            whatsapp
        }
    }
`

export const DELETE_FAMILY = gql`
    mutation ($removeFamilyId: Int!) {
        removeFamily(id: $removeFamilyId) {
            block
            createdAt
            houseHolder
            houseName
            houseNumber
            houseType
            id
            mahallu {
                id
                name
            }
            mobile
            name
            regNo
            panchayathMunicipality
            panchayathWardNo
            place
            rationCardType
            updatedAt
            wardHouseNo
            whatsapp
        }
    }
`

export const DELETE_FAMILIES = gql`
    mutation ($removeFamilyIds: [Int!]!) {
        removeFamilies(ids: $removeFamilyIds) {
            block
            createdAt
            houseHolder
            houseName
            houseNumber
            houseType
            id
            mahallu {
                id
                name
            }
            mobile
            name
            regNo
            panchayathMunicipality
            panchayathWardNo
            place
            rationCardType
            updatedAt
            wardHouseNo
            whatsapp
        }
    }
`
