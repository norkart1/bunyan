import HorizontalMenuContent from './HorizontalMenuContent'
import { useRouteKeyStore } from '@/store/routeKeyStore'
import { useSessionUser } from '@/store/authStore'
import navigationConfig from '@/configs/navigation.config'
import { RoleEnum } from '@/generated/graphql'

const HorizontalNav = ({
    translationSetup = true,
}: {
    translationSetup?: boolean
}) => {
    const currentRouteKey = useRouteKeyStore((state) => state.currentRouteKey)

    const userAuthority = useSessionUser((state) => [state.user?.role])

    return (
        <HorizontalMenuContent
            navigationTree={navigationConfig}
            routeKey={currentRouteKey}
            userAuthority={userAuthority as RoleEnum[] || [] as RoleEnum[]}
            translationSetup={translationSetup}
        />
    )
}

export default HorizontalNav
