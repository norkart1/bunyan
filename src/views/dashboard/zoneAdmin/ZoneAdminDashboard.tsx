import React from 'react'
import InfoBar from './components/InfoBar'
import RankTable from './components/Table'
import DashboardGraph from './components/Graph'

const ZoneAdminDashboard = () => {
  return (
    <div>
      <InfoBar />
      <DashboardGraph />
      <RankTable />
    </div>
  )
}

export default ZoneAdminDashboard