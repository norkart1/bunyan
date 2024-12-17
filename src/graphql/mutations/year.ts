import { gql } from "@apollo/client"


export const CREATE_YEAR = gql`
mutation($createYearInput: CreateYearInput!) {
  createYear(createYearInput: $createYearInput) {
    id
    name
    type
    createdAt
    updatedAt
  }
}
`

export const UPDATE_YEAR = gql`
mutation($updateYearInput: UpdateYearInput!) {
  updateYear(updateYearInput: $updateYearInput) {
    id
    name
    type
    createdAt
    updatedAt
  }
}
`

export const DELETE_YEAR = gql`
mutation($id: Int!) {
  removeYear(id: $id){
    id
    name
    type
    createdAt
    updatedAt
  }
}
`

export const DELETE_YEARS = gql`
mutation($ids: [Int!]!) {
  removeYears(ids: $ids){
    id
    name
    type
    createdAt
    updatedAt
  }
}
`