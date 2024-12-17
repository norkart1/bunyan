import { gql } from '@apollo/client'

export const CREATE_TASK = gql`
    mutation ($createTaskInput: CreateTaskInput!) {
        createTask(createTaskInput: $createTaskInput) {
            active
            badge {
                id
                name
                icon
            }
            badgeId
            campaign {
                id
                title
            }
            campaignId
            category {
                id
                title
            }
            categoryId
            createdAt
            description
            dueDate
            id
            points
            startDate
            title
            updatedAt
            verified
            year {
                id
                name
            }
            yearId
        }
    }
`

export const UPDATE_TASK = gql`
    mutation ($updateTaskInput: UpdateTaskInput!) {
        updateTask(updateTaskInput: $updateTaskInput) {
            active
            badge {
                id
                name
                icon
            }
            badgeId
            campaign {
                id
                title
            }
            campaignId
            category {
                id
                title
            }
            categoryId
            createdAt
            description
            dueDate
            id
            points
            startDate
            title
            updatedAt
            verified
            year {
                id
                name
            }
            yearId
        }
    }
`

export const DELETE_TASK = gql`
    mutation ($id: Int!) {
        removeTask(id: $id) {
            active
            badge {
                id
                name
                icon
            }
            badgeId
            campaign {
                id
                title
            }
            campaignId
            category {
                id
                title
            }
            categoryId
            createdAt
            description
            dueDate
            id
            points
            startDate
            title
            updatedAt
            verified
            year {
                id
                name
            }
            yearId
        }
    }
`

export const DELETE_TASKS = gql`
    mutation ($ids: [Int!]!) {
        removeTasks(ids: $ids) {
            active
            badge {
                id
                name
                icon
            }
            badgeId
            campaign {
                id
                title
            }
            campaignId
            category {
                id
                title
            }
            categoryId
            createdAt
            description
            dueDate
            id
            points
            startDate
            title
            updatedAt
            verified
            year {
                id
                name
            }
            yearId
        }
    }
`
