//后台服务器数据管理
import { defineStore } from 'pinia'
const useServerStore = defineStore('useServer',{
    state: () => {
        return {
            // 部署上线，后端服务
            baseURL: 'http://101.132.190.14:8080',
        }
    }
})

export default useServerStore