import { lazy, Suspense, useEffect } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import SettingsMenu from './components/SettingsMenu'
import SettingMobileMenu from './components/SettingMobileMenu'
import useResponsive from '@/utils/hooks/useResponsive'
import { useSettingsStore } from './store/settingsStore'
import useQuery from '@/utils/hooks/useQuery'
import { View, ViewEnum } from './types'
import { useSessionUser } from '@/store/authStore'
import { RoleEnum } from '@/generated/graphql'

const Profile = lazy(() => import('./components/SettingsProfile'))
const Security = lazy(() => import('./components/SettingsSecurity'))

const Settings = () => {
    const { currentView, setCurrentView } = useSettingsStore()
    const query = useQuery()

    const user = useSessionUser((state) => state.user)

    const currentPath = query.get('tab')

    useEffect(() => {
        if (currentPath && currentPath !== currentView) {
            // if the current path is included in the view enum, set the current view as profile else set it as current path

            if (Object.values(ViewEnum).includes(currentPath as any)) {
                setCurrentView(currentPath as View)
            } else {
                setCurrentView('profile')
            }
        }
    }, [currentPath, setCurrentView])

    const { smaller, larger } = useResponsive()

    return (
        <AdaptiveCard className="h-full">
            <div className="flex flex-auto h-full">
                {larger.lg && (
                    <div className="'w-[200px] xl:w-[280px]">
                        <SettingsMenu />
                    </div>
                )}
                <div className="ltr:xl:pl-6 rtl:xl:pr-6 flex-1 py-2">
                    {smaller.lg && (
                        <div className="mb-6">
                            <SettingMobileMenu />
                        </div>
                    )}
                    <Suspense fallback={<></>}>
                    {
                        user?.role === RoleEnum.MahalluAdmin && currentView === 'profile' && <Profile />
                    }
                    {
                        user?.role !== RoleEnum.MahalluAdmin && currentView === 'profile' && <Security />
                    }
                        {currentView === 'security' && <Security />}
                    </Suspense>
                </div>
            </div>
        </AdaptiveCard>
    )
}

export default Settings
