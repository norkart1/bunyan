import Menu from '@/components/ui/Menu'
import ScrollBar from '@/components/ui/ScrollBar'
import { useSettingsStore } from '../store/settingsStore'
import useQuery from '@/utils/hooks/useQuery'
import {
    TbUserSquare,
    TbLock,
    TbBell,
    TbFileDollar,
    TbRefreshDot,
} from 'react-icons/tb'
import type { View } from '../types'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionUser } from '@/store/authStore'
import { RoleEnum } from '@/generated/graphql'

const { MenuItem } = Menu

const menuList: { label: string; value: View; icon: ReactNode }[] = [
    { label: 'Profile', value: 'profile', icon: <TbUserSquare /> },
    { label: 'Security', value: 'security', icon: <TbLock /> },
]

export const SettingsMenu = ({ onChange }: { onChange?: () => void }) => {
    const query = useQuery()
    const navigate = useNavigate()

    const { currentView, setCurrentView } = useSettingsStore()

    const user = useSessionUser((state) => state.user)

    const currentPath = query.get('tab')

    const handleSelect = (value: View) => {
        setCurrentView(value)
        onChange?.()
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <ScrollBar className="h-full overflow-y-auto">
                <Menu className="mx-2 mb-10">
                    {menuList.map((menu) => {
                        if (user?.role !== RoleEnum.MahalluAdmin && menu.value === 'profile')  {
                            return null
                        }
                            
                        return (
                            <MenuItem
                                key={menu.value}
                                eventKey={menu.value}
                                className={`mb-2 ${
                                    currentView === menu.value
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : ''
                                }`}
                                isActive={currentPath === menu.value}
                                onSelect={() => {
                                    handleSelect(menu.value)
                                    navigate(`/settings?tab=${menu.value}`)
                                }}
                            >
                                <span className="text-2xl ltr:mr-2 rtl:ml-2">
                                    {menu.icon}
                                </span>
                                <span>{menu.label}</span>
                            </MenuItem>
                        )
})
                    }
                </Menu>
            </ScrollBar>
        </div>
    )
}

export default SettingsMenu
