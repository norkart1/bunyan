import { gql } from '@apollo/client'

export const CREATE_CAMPAIGN = gql`
    mutation ($createCampaignInput: CreateCampaignInput!) {
        createCampaign(createCampaignInput: $createCampaignInput) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                id
                name
            }
            badge {
                id
                name
            }
        }
    }
`

export const UPDATE_CAMPAIGN = gql`
    mutation ($updateCampaignInput: UpdateCampaignInput!) {
        updateCampaign(updateCampaignInput: $updateCampaignInput) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                id
                name
            }
            badge {
                id
                name
            }
        }
    }
`

export const DELETE_CAMPAIGN = gql`
    mutation ($removeCampaignId: Int!) {
        removeCampaign(id: $removeCampaignId) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                id
                name
            }
            badge {
                id
                name
            }
        }
    }
`

export const DELETE_CAMPAIGNS = gql`
    mutation ($removeCampaignIds: [Int!]!) {
        removeCampaigns(ids: $removeCampaignIds) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                id
                name
            }
            badge {
                id
                name
            }
        }
    }
`
