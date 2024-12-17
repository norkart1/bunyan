import { gql } from '@apollo/client'

export const CREATE_TASK_CATEGORY = gql`
    mutation ($createTaskCategoryInput: CreateTaskCategoryInput!) {
        createTaskCategory(createTaskCategoryInput: $createTaskCategoryInput) {
            active
            color
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`

export const UPDATE_TASK_CATEGORY = gql`
    mutation ($updateTaskCategoryInput: UpdateTaskCategoryInput!) {
        updateTaskCategory(updateTaskCategoryInput: $updateTaskCategoryInput) {
            active
            color
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`

export const DELETE_TASK_CATEGORY = gql`
    mutation ($id: Int!) {
        removeTaskCategory(id: $id) {
            active
            color
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`

export const DELETE_TASK_CATEGORIES = gql`
    mutation ($ids: [Int!]!) {
        removeTaskCategories(ids: $ids) {
            active
            color
            createdAt
            description
            id
            title
            updatedAt
        }
    }
`
