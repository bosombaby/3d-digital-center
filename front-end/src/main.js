import { createApp } from 'vue'
import App from './App.vue'

//全局样式
import '@/styles/index.scss'

import 'default-passive-events'

//图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/iconfont/iconfont.css'

//路由注册
import router from '@/router/index'
import '@/config/permission.js'


//菜单项
import SideItem from '@/layout/components/sidebar/SideItem.vue'

//存储管理
import { registerStore } from '@/store'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.component('SideItem',SideItem)
app.use(router)
registerStore( app )
app.mount('#app')



