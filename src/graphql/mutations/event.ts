import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation ($createEventInput: CreateEventInput!) {
        createEvent(createEventInput: $createEventInput) {
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

export const UPDATE_EVENT = gql`
    mutation ($updateEventInput: UpdateEventInput!) {
        updateEvent(updateEventInput: $updateEventInput) {
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

export const DELETE_EVENT = gql`
    mutation ($removeEventId: Int!) {
        removeEvent(id: $removeEventId) {
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

export const DELETE_EVENTS = gql`
    mutation ($removeEventIds: [Int!]!) {
        removeEvents(ids: $removeEventIds) {
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