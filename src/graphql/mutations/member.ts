import { gql } from '@apollo/client'

export const CREATE_MEMBER = gql`
    mutation ($createMemberInput: CreateMemberInput!) {
        createMember(createMemberInput: $createMemberInput) {
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

export const UPDATE_MEMBER = gql`
    mutation ($updateMemberInput: UpdateMemberInput!) {
        updateMember(updateMemberInput: $updateMemberInput) {
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

export const DELETE_MEMBER = gql`
    mutation ($removeMemberId: Int!) {
        removeMember(id: $removeMemberId) {
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

export const DELETE_MEMBERS = gql`
    mutation ($removeMemberIds: [Int!]!) {
        removeMembers(ids: $removeMemberIds) {
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
