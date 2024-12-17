import { gql } from '@apollo/client'

export const CREATE_INCOME = gql`
    mutation ($createIncomeInput: CreateIncomeInput!) {
        createIncome(createIncomeInput: $createIncomeInput) {
            updatedAt
            receivedBy
            mahalluId
            mahallu {
                id
                name
            }
            description
            date
            createdAt
            categoryId
            category {
                id
                name
            }
            amount
            account {
                id
                name
            }
        }
    }
`

export const UPDATE_INCOME = gql`
    mutation ($updateIncomeInput: UpdateIncomeInput!) {
        updateIncome(updateIncomeInput: $updateIncomeInput) {
            updatedAt
            receivedBy
            mahalluId
            mahallu {
                id
                name
            }
            description
            date
            createdAt
            categoryId
            category {
                id
                name
            }
            amount
            account {
                id
                name
            }
        }
    }
`

export const REMOVE_INCOME = gql`
    mutation ($removeIncomeId: Int!) {
        removeIncome(id: $removeIncomeId) {
            updatedAt
            receivedBy
            mahalluId
            mahallu {
                id
                name
            }
            description
            date
            createdAt
            categoryId
            category {
                id
                name
            }
            amount
            account {
                id
                name
            }
        }
    }
`

export const REMOVE_INCOMES = gql`
    mutation ($removeIncomeIds: [Int!]!) {
        removeIncomes(ids: $removeIncomeIds) {
            updatedAt
            receivedBy
            mahalluId
            mahallu {
                id
                name
            }
            description
            date
            createdAt
            categoryId
            category {
                id
                name
            }
            amount
            account {
                id
                name
            }
        }
    }
`
