import React from 'react'
import DashboardGraph from './components/Graph'
import InfoBar from './components/InfoBar'
import RankTable from './components/Table'

const DistrictAdminDashboard = () => {
  return (
    <div>
      <InfoBar />
      <DashboardGraph />
      <RankTable />
    </div>
  )
}

export default DistrictAdminDashboard