import { gql } from "@apollo/client"

export const FIND_ALL_JOBS = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  jobs(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    active
    admin
    createdAt
    description
    employmentType
    expirationDate
    id
    location
    locationType
    mahallu {
      id
      name
    }
    mahalluId
    salaryRange
    skills
    title
    updatedAt
  }
}
`

export const FIND_JOB_BY_ID = gql`
query($id: Int!) {
  job(id: $id) {
    active
    admin
    createdAt
    description
    employmentType
    expirationDate
    id
    location
    locationType
    mahallu {
      id
      name
    }
    mahalluId
    salaryRange
    skills
    title
    updatedAt
  }
}
`

export const COUNT_JOBS = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countJob(filters: $filters, relationsToFilter: $relationsToFilter)
}
`