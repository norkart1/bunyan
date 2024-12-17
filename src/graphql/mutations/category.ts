import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
    mutation ($createCategoryInput: CreateCategoryInput!) {
        createCategory(createCategoryInput: $createCategoryInput) {
            createdAt
            id
            mahallu {
                id
            }
            name
            type
            updatedAt
        }
    }
`

export const UPDATE_CATEGORY = gql`
    mutation ($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            createdAt
            id
            mahallu {
                id
            }
            name
            type
            updatedAt
        }
    }
`

export const DELETE_CATEGORY = gql`
    mutation ($removeCategoryId: Int!) {
        removeCategory(id: $removeCategoryId) {
            createdAt
            id
            mahallu {
                id
            }
            name
            type
            updatedAt
        }
    }
`

export const DELETE_CATEGORIES = gql`
    mutation ($removeCategoryIds: [Int!]!) {
        removeCategories(ids: $removeCategoryIds) {
            createdAt
            id
            mahallu {
                id
            }
            name
            type
            updatedAt
        }
    }
`