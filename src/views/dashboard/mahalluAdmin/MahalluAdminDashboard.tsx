import React from 'react'
import InfoBar from './components/InfoBar'
import WelcomeBox from './components/WelcomeBox'
import AiSuggestion from './components/AiSuggestion'
import Leaderboard from './components/Leaderboard'
import Tasks from './components/Tasks'
import MultiLineGraph from './components/Graph'
import Ranking from './components/Leaderboard'
import PostsCards from './components/PostsCard'

const MahalluAdminDashboard = () => {
    return (
        <div>
            <InfoBar />
            <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-5/12 lg:w-1/3  flex flex-col gap-4 ">
                    <Ranking />
                    <PostsCards />
                </div>
                <div className="w-full md:7/12 lg:w-2/3 md:pl-4 pt-4 md:pt-0 flex flex-col gap-4">
                    <AiSuggestion />
                    <Tasks />
                </div>
            </div>
            <MultiLineGraph />
        </div>
    )
}

export default MahalluAdminDashboard
