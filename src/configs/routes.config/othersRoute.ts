import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { RoleEnum } from '@/generated/graphql'

const othersRoute: Routes = [
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(
            () => import('@/views/others/AccessDenied'),
        ),
        authority: [RoleEnum.SuperAdmin],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
]

export default othersRoute
