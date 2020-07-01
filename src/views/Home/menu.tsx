import React from 'react'
import Loadable  from '@loadable/component'
import PageLoading from '@/components/common/PageLoading/index'

const loadComponent = ( loader: () => Promise<any> ) => Loadable( loader, { fallback: <PageLoading/> })

export const asyncComponents = {
    Upload: loadComponent( () => import(/* webpackChunkName:"Upload" */'@/pages/Upload') ),
    Chess: loadComponent( () => import( /* webpackChunkName:"Chess" */'@/pages/Chess' ) )
}

type asyncComponentsKey = keyof typeof asyncComponents

interface IMenu{
    id: string;
    path: string;
    component: asyncComponentsKey;
    exact?: boolean;

}

export const menu:IMenu[] = [
    {
        id: '01',
        path: '/',
        component: 'Upload',
        exact: true
    },
    {
        id:'02',
        path:'/chess',
        component: 'Chess',
        exact: true
    }
]