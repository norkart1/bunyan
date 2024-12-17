import { gql } from '@apollo/client'

export const FIND_ALL_CAMPAIGNS = gql`
    query Campaigns(
        $filters: JSON
        $limit: Int
        $offset: Int
        $orderBy: JSON
        $relationsToFilter: JSON
    ) {
        campaigns(
            filters: $filters
            limit: $limit
            offset: $offset
            orderBy: $orderBy
            relationsToFilter: $relationsToFilter
        ) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                name
                id
            }
            badge {
                id
                name
            }
        }
    }
`

export const COUNT_CAMPAIGNS = gql`
    query CountCampaigns($filters: JSON, $relationsToFilter: JSON) {
        countCampaign(filters: $filters, relationsToFilter: $relationsToFilter)
    }
`

export const FIND_CAMPAIGN_BY_ID = gql`
    query Campaign($id: Int!) {
        campaign(id: $id) {
            active
            createdAt
            description
            id
            title
            updatedAt
            year {
                name
                id
            }
            badge {
                id
                name
            }
        }
    }
`
