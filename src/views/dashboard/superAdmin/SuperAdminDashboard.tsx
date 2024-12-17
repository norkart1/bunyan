import DashboardCards from "./DashboardCards"
import DashboardGraph from "./components/Graph"
import InfoBar from "./components/InfoBar"
import RankTable from "./components/Table"

const SuperAdminDashboard = () => {
  return (
    <div>
      <InfoBar />
      <DashboardGraph/>
      <DashboardCards />
      <RankTable />
    </div>
  )
}

export default SuperAdminDashboard