import React from 'react'
import InfoBar from './components/InfoBar'
import DashboardGraph from './components/Graph'
import Notification from './components/Notification'
import DashboardCards from './components/Cards'
import RankTable from './components/Table'
const VillageAdminDashboard = () => {
  return (
    <div>
      <InfoBar />
      <div className="flex gap-2 mt-4 flex-col md:flex-row">
      <DashboardGraph/>
      <Notification/>
      </div>
      <RankTable/>
    </div>
  )
}

export default VillageAdminDashboard