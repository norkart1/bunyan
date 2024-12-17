import { gql } from '@apollo/client'

export const FIND_ALL_MEMBERS = gql`
    query (
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        members(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            abroad
            abroadPlace
            bloodGroup
            contact
            createdAt
            family {
                id
                name
            }
            yearOfBirth
            updatedAt
            skills
            remarks
            relationToHouseHolder
            regNo
            name
            maritalStatus
            jobSector
            job
            islamicQualification
            id
            healthCondition
            generalQualification
            gender
            familyId
        }
    }
`

export const COUNT_MEMBERS = gql`
    query ($filters: JSON, $relationsToFilter: JSON) {
        countMember(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_MEMBER_BY_ID = gql`
    query ($id: Int!) {
        member(id: $id) {
            abroad
            abroadPlace
            bloodGroup
            contact
            createdAt
            family {
                id
                name
            }
            yearOfBirth
            updatedAt
            skills
            remarks
            relationToHouseHolder
            regNo
            name
            maritalStatus
            jobSector
            job
            islamicQualification
            id
            healthCondition
            generalQualification
            gender
            familyId
        }
    }
`
