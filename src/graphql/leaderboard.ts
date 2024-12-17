import { gql } from '@apollo/client'

export const LEADERBOARD = gql`
    query (
        $districtId: Int
        $limit: Int
        $offset: Int
        $search: String
        $villageId: Int
        $zoneId: Int
    ) {
        getLeaderboard(
            districtId: $districtId
            limit: $limit
            offset: $offset
            search: $search
            villageId: $villageId
            zoneId: $zoneId
        ) {
            badgesCount
            counts {
                taskParticipants
                events
                jobs
                otherPrograms
                posts
            }
            badges {
                name
                icon
            }
            id
            name
            place
            regNo
            totalPoints
        }
    }
`
