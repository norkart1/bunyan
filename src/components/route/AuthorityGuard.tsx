import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'
import { RoleEnum } from '@/generated/graphql'

type AuthorityGuardProps = PropsWithChildren<{
    userAuthority?: RoleEnum[]
    authority?: RoleEnum[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
    const { userAuthority = [], authority = [], children } = props

    const authorityMatched = useAuthority(userAuthority, authority)

    return <>{authorityMatched ? children : <Navigate to="/access-denied" />}</>
}

export default AuthorityGuard
