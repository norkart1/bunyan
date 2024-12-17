import { gql } from "@apollo/client"

export const FIND_ALL_NOTIFICATIONS = gql`
query($filters: JSON, $limit: Int, $offset: Int, $orderBy: JSON, $relationsToFilter: JSON)  {
  notifications(filters: $filters, limit: $limit, offset: $offset, orderBy: $orderBy, relationsToFilter: $relationsToFilter) {
    active
    buttonName
    createdAt
    createdById
    description
    districts {
      id
      name
    }
    fileURL
    id
    link
    mahallus {
      id
      name
    }
    title
    updatedAt
    villages {
      name
      id
    }
    zones {
      id
      name
    }
  }
}
`

export const COUNT_NOTIFICATIONS = gql`
query($filters: JSON, $relationsToFilter: JSON) {
  countNotification(filters: $filters, relationsToFilter: $relationsToFilter)
}
`

export const FIND_NOTIFICATION_BY_ID = gql`
query($id: Int!) {
  notification(id: $id) {
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

export const FIND_MY_NOTIFICATIONS = gql`
query MyNotifications($limit: Int, $offset: Int) {
  myNotifications(limit: $limit, offset: $offset) {
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

export const FIND_MY_SENT_NOTIFICATIONS = gql`
query MySentNotifications($limit: Int, $offset: Int) {
  mySentNotifications(limit: $limit, offset: $offset) {
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