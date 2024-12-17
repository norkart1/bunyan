import { gql } from '@apollo/client'

export const CHECK_LOGGED_IN = gql`
    query checkLoggedIn{
        checkLoggedIn{
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

export const getCredentials = gql`
    query getCredentials{
        getCredentials{
            id
        }
    }
`


