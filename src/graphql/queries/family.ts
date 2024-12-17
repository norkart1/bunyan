import { gql } from '@apollo/client'

export const FIND_ALL_FAMILIES = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        families(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
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

export const COUNT_FAMILIES = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countFamily(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_FAMILY_BY_ID = gql`
    query ($id: Int!) {
        family(id: $id) {
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
