import { gql } from "@apollo/client"

export const FIND_ALL_EXPENSES = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  expenses(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
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

export const COUNT_EXPENSES = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countExpense(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_EXPENSE_BY_ID = gql`
query($id: Int!) {
  expense(id: $id) {
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