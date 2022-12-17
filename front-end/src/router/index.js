//路由版本 1.0
import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../layout/index.vue'

// 配置公开路由信息
const constantRoutes = [
    {
        component: Layout,
        children: [
            {
                path: '/dashboard',
                name:'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component:()=>import('@/views/login/index.vue')
    },
    {
        path:'/display',
        name: 'display',
        component:()=>import('@/views/displayModel/index.vue')
    },
    {
        path : '/401',
        name : 'Error401',
        component : () => import( '@/views/error/401.vue' ),
    },
    {
        path: '/404',
        name: 'Error404',
        component: () => import('@/views/error/404.vue'),
    },
    {
        path : '/500',
        name : 'Error500',
        component : () => import( '@/views/error/500.vue'),
    }
]

//动态需要权限加载的路由
const asyncRoutes = [
    {
        component: Layout,
        children: [
            {
                path: '/models',
                name:'modelCenter',
                component:()=>import('@/views/resources/index.vue')
            },
            {
                path: '/build',
                name:'buildModel',
                component: () => import('@/views/build/index.vue'),
                meta:{isAuth:true,level:0}
            },
            {
                path: '/personal',
                name:'personal',
                component: () => import('@/views/personal/index.vue'),
                meta:{isAuth:true,level:0}
            }
        ]
    },
    {
        path:'/manage',
        component: Layout,
        children: [
            {
                path: 'user',
                name:'userInfo',
                component: () => import('@/views/manage/user.vue'),
                meta:{isAuth:true,level:1}
            },
            {
                path: 'model',
                name:'modelInfo',
                component: () => import('@/views/manage/model.vue'),
                meta:{isAuth:true,level:1}
            },
        ]
    }
]
const router = createRouter({
    routes: constantRoutes.concat(asyncRoutes),
    history:createWebHashHistory()
})


export default router