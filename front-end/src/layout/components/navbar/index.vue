<template>
    <div class="nav">
        <!-- 左侧导航 -->
        <div class="left-nav">
            
        </div>

        <!-- 右侧导航 -->
        <div class="right-nav">
            <img src="@/assets/image/login/user_icon.gif" class="user_icon">
            <el-dropdown class="user_name">
                <span>
                    {{name}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="turnPersonal">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
    
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/'
const router = useRouter()

let store = useUserStore()
let name = ref(store.username)
const turnPersonal = () => {
    router.push({ name:'personal'})
}

const logout = () => {
    localStorage.removeItem('user')
    // 清除本地token
    router.push({ name: 'login' })
}
</script>


<style lang="scss">
.nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    line-height: 50px;
}
.right-nav{
    .user_icon{
        width: 40px;
        height: 40px;
        border-radius: 10px;
        vertical-align: middle;
        display: inline-block;
    }
    .user_name{
        vertical-align: middle;
        padding-left: 20px;
    }
}
</style>