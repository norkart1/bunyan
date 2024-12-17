import { RoleEnum } from '@/generated/graphql'
import { useSessionUser } from '@/store/authStore'
import SuperAdminDashboard from './superAdmin/SuperAdminDashboard'
import DistrictAdminDashboard from './districtAdmin/DistrictAdminDashboard'
import ZoneAdminDashboard from './zoneAdmin/ZoneAdminDashboard'
import VillageAdminDashboard from './villageAdmin/VillageAdminDashboard'
import MahalluAdminDashboard from './mahalluAdmin/MahalluAdminDashboard'
import InfoAdminDashboard from './infoAdmin/InfoAdminDashboard'

const Dashboard = () => {
    const user = useSessionUser((state) => state.user)
    const role: RoleEnum = user?.role as RoleEnum
    //RoleEnum.MahalluAdmin   
    return (
        <>
            {role === RoleEnum.SuperAdmin ? (
                <SuperAdminDashboard />
            ) : role === RoleEnum.DistrictAdmin ? (
                <DistrictAdminDashboard />
            ) : role === RoleEnum.ZoneAdmin ? (
                <ZoneAdminDashboard />
            ) : role === RoleEnum.VillageAdmin ? (
                <VillageAdminDashboard />
            ) : role === RoleEnum.MahalluAdmin ? (
                <MahalluAdminDashboard />
            ) : role === RoleEnum.InfoAdmin ? (
                <InfoAdminDashboard />
            ) : (
                <div>Invalid Role</div>
            )}
        </>
    )
}

export default Dashboard
