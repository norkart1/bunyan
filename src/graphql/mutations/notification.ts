import { gql } from "@apollo/client"


export const CREATE_NOTIFICATION = gql`
mutation Mutation($createNotificationInput: CreateNotificationInput!) {
  createNotification(createNotificationInput: $createNotificationInput) {
    id
    content
    active
    createdAt
    createdBy {
      id
      username
      role
    }
    credentials {
       id
      username
      role
    }
    title
    updatedAt
    viewedBy
  }
}
`

export const UPDATE_NOTIFICATION = gql`
mutation($updateNotificationInput: UpdateNotificationInput!) {
  updateNotification(updateNotificationInput: $updateNotificationInput) {
      id
    content
    active
    createdAt
    createdBy {
      id
      username
      role
    }
    credentials {
       id
      username
      role
    }
    title
    updatedAt
    viewedBy
  }
}
`

export const REMOVE_NOTIFICATION = gql`
mutation($removeNotificationId: Int!) {
  removeNotification(id: $removeNotificationId) {
      id
    content
    active
    createdAt
    createdBy {
      id
      username
      role
    }
    credentials {
       id
      username
      role
    }
    title
    updatedAt
    viewedBy
  }
}
`

export const REMOVE_NOTIFICATIONS = gql`
mutation($removeNotificationIds: [Int!]!) {
  removeNotifications(ids: $removeNotificationIds) {
      id
    content
    active
    createdAt
    createdBy {
      id
      username
      role
    }
    credentials {
       id
      username
      role
    }
    title
    updatedAt
    viewedBy
  }
}
`

export const UPDATE_VIEWED_BY = gql`
query UpdateViewedBy  ($id: Int!) {
updateViewedBy(id: $id) {
  id
    content
    active
    createdAt
    createdBy {
      id
      username
      role
    }
    credentials {
       id
      username
      role
    }
    title
    updatedAt
    viewedBy
}
}
`