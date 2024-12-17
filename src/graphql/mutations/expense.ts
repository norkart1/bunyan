import { gql } from "@apollo/client"

export const CREATE_EXPENSE = gql`
    mutation ($createExpenseInput: CreateExpenseInput!) {
        createExpense(createExpenseInput: $createExpenseInput) {
            account {
      id
      name
    }
    amount
    category {
      id
      name
    }
    createdAt
    date
    description
    id
    mahallu {
      id
      name
    }
    paidBy
    updatedAt
  }
    }
`

export const UPDATE_EXPENSE = gql`
    mutation ($updateExpenseInput: UpdateExpenseInput!) {
        updateExpense(updateExpenseInput: $updateExpenseInput) {
            account {
      id
      name
    }
    amount
    category {
      id
      name
    }
    createdAt
    date
    description
    id
    mahallu {
      id
      name
    }
    paidBy
    updatedAt
  }
    }
`

export const DELETE_EXPENSE = gql`
    mutation ($removeExpenseId: Int!) {
        removeExpense(id: $removeExpenseId) {
            account {
      id
      name
    }
    amount
    category {
      id
      name
    }
    createdAt
    date
    description
    id
    mahallu {
      id
      name
    }
    paidBy
    updatedAt
  }
    }
`

export const DELETE_EXPENSES = gql`
    mutation ($removeExpenseIds: [Int!]!) {
        removeExpenses(ids: $removeExpenseIds) {
            account {
      id
      name
    }
    amount
    category {
      id
      name
    }
    createdAt
    date
    description
    id
    mahallu {
      id
      name
    }
    paidBy
    updatedAt
  }
    }
`