import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Login($password: String!, $username: String!) {
        login(password: $password, username: $username) {
            token
            user {
                role
                id
                username
                mahalluId
                zoneId
                villageId
                districtId
            }
        }
    }
`

export const LOGOUT = gql`
    mutation Mutation {
        logout
    }
`

export const CHANGE_PASSWORD = gql`
    mutation Mutation($newPassword: String!, $oldPassword: String!) {
        changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
    }
`
