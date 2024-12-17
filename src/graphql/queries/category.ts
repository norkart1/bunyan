import { gql } from "@apollo/client"

export const FIND_ALL_CATEGORIES = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  categories(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    createdAt
    id
    mahallu {
      id
    }
    name
    type
    updatedAt
  }
}
`

export const COUNT_CATEGORIES = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countCategory(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_CATEGORY_BY_ID = gql`
query($id: Int!) {
  category(id: $id) {
    createdAt
    id
    mahallu {
      id
    }
    name
    type
    updatedAt
  }
}
`