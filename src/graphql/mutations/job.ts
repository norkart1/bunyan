import { gql } from "@apollo/client"

export const CREATE_JOB = gql`
mutation($createJobInput: CreateJobInput!) {
  createJob(createJobInput: $createJobInput) {
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

export const UPDATE_JOB = gql`
mutation($updateJobInput: UpdateJobInput!) {
  updateJob(updateJobInput: $updateJobInput) {
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

export const DELETE_JOB = gql`
mutation($removeJobId: Int!) {
  removeJob(id: $removeJobId) {
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

export const DELETE_JOBS = gql`
mutation($removeJobIds: [Int!]!) {
  removeJobs(ids: $removeJobIds) {
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