import { gql } from "@apollo/client"

export const FIND_ALL_EVENTS = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  events(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    active
    admin
    createdAt
    description
    endingDate
    id
    location
    mahallu {
      id
      name
    }
    mahalluId
    online
    posterURL
    remarks
    startingDate
    title
    updatedAt
    verified
  }
}
`

export const COUNT_EVENTS = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countEvent(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_EVENT_BY_ID = gql`
query($id: Int!) {
  event(id: $id) {
    active
    admin
    createdAt
    description
    endingDate
    id
    location
    mahallu {
      id
      name
    }
    mahalluId
    online
    posterURL
    remarks
    startingDate
    title
    updatedAt
    verified
  }
}
`