import { gql } from "@apollo/client"

export const FIND_ALL_DONATIONS = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  donations(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    amount
    charity {
      id
      title
    }
    contact
    createdAt
    donatedAt
    guest
    id
    mahallu {
      id
      name
    }
    member {
      id
    }
    name
    status
    updatedAt
  }
}
`

export const COUNT_DONATIONS = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countDonation(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_DONATION_BY_ID = gql`
query($id: Int!) {
  donation(id: $id) {
    amount
    charity {
      id
      title
    }
    contact
    createdAt
    donatedAt
    guest
    id
    mahallu {
      id
      name
    }
    member {
      id
    }
    name
    status
    updatedAt
  }
}
`