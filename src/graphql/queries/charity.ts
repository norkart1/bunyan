import { gql } from "@apollo/client"

export const FIND_ALL_CHARITIES = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  charities(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    active
    admin
    createdAt
    description
    expirationDate
    id
    mahallu {
      id
      name
    }
    posterUrl
    remarks
    startingDate
    target
    title
    updatedAt
    verified
  }
}
`

export const COUNT_CHARITIES = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countCharity(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_CHARITY_BY_ID = gql`
query($id: Int!) {
  charity(id: $id) {
    active
    admin
    createdAt
    description
    expirationDate
    id
    mahallu {
      id
      name
    }
    posterUrl
    remarks
    startingDate
    target
    title
    updatedAt
    verified
  }
}
`