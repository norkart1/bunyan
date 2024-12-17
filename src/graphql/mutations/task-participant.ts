import { gql } from "@apollo/client";



export const CREATE_TASK_PARTICIPANT = gql`
mutation ($createTaskParticipantInput: CreateTaskParticipantInput!) {
  createTaskParticipant(createTaskParticipantInput: $createTaskParticipantInput) {
    claimed
    createdAt
    description
    files
    id
    mahalluId
    remarks
    mahallu {
      id
      name
    }
    task {
      id
      title
    }
    title
    updatedAt
    verified
  }
}
`

export const UPDATE_TASK_PARTICIPANT = gql`
mutation ($updateTaskParticipantInput: UpdateTaskParticipantInput!) {
  updateTaskParticipant(updateTaskParticipantInput: $updateTaskParticipantInput) {
    claimed
    createdAt
    description
    files
    id
    mahalluId
    remarks
    mahallu {
      id
      name
    }
    task {
      id
      title
    }
    title
    updatedAt
    verified
  }
}
`

export const DELETE_TASK_PARTICIPANT = gql`
mutation ($id: Int!) {
  removeTaskParticipant(id: $id) {
    claimed
    createdAt
    description
    files
    id
    mahalluId
    remarks
    mahallu {
      id
      name
    }
    task {
      id
      title
    }
    title
    updatedAt
    verified
  }
}
`

export const DELETE_TASK_PARTICIPANTS = gql`
mutation ($ids: [Int!]!) {
  removeTaskParticipants(ids: $ids) {
    claimed
    createdAt
    description
    files
    id
    mahalluId
    remarks
    mahallu {
      id
      name
    }
    task {
      id
      title
    }
    title
    updatedAt
    verified
  }
}
`

export const VERIFY_TASK_PARTICIPANT = gql`
mutation ($id: Int!) {
  verifyTaskParticipant(id: $id) {
    verified
  }
}
`

export const CLAIM_TASK_PARTICIPANT = gql`
mutation ($id: Int!) {
  claimTaskParticipant(id: $id) {
    claimed
  }
}
`