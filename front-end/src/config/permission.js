/* 
    2022/12/2记录
    记录条后续可加
    对接后台数据待做

*/

import router from '@/router'
import { useUserStore } from '@/store/'
import NProgress from '@/utils/progress'
// 全局路由守卫
router.beforeEach((to, from, next) => {
    NProgress.start()
    const store = useUserStore()
    const level=store.level
    const hasToken = localStorage.getItem('user')
    if (to.path === '/') {
       next({name:'login'})
    }
    // 前往登录界面
    else if (to.name === 'login') {
        if (hasToken!=null) {
            next({name:'dashboard'})
        } else {
            next()
        }
    }
    //前往验证界面
    else {
        if (to.meta.isAuth) {
            if (!hasToken) {
                alert('需要登陆')
                next({name:'login'})
            } else {

                if (level < to.meta.level) {
                    alert('权限不足')
                }
                else {
                    next()
                }
                
            }
        } else {
            next()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})