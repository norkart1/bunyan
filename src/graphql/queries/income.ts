import { gql } from "@apollo/client"

export const FIND_ALL_INCOMES = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  incomes(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
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

export const COUNT_INCOMES = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countIncome(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_INCOME_BY_ID = gql`
query($id: Int!) {
  income(id: $id) {
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

