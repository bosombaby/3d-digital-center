import { defineStore } from 'pinia'
const useUserStore = defineStore('userInfo', {
    state: () => {
        return {
            //暂时存储用户信息
            id: '',
            username: '',
            password:'',
            level: 0,
            token:''
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {key: 'user',storage:localStorage,paths:['id','username','level']}
        ]
    },
    actions: {
        
    }

})
export default useUserStore