<template>
    <div class="person-info">
        个人信息展示页面
        用户名：{{userInfo.username}}
        等级：{{ userInfo.level}}
    </div>
    <!-- 头像生成器 -->
    <div class="avatar-build">
        <iframe src="https://ezshine.jnsii.com/cases/avatarbuilder/" scrolling="no" frameborder="0" class="avatar"></iframe>
    </div>

</template>

<script setup>
import {reactive,onMounted} from 'vue'


const userInfo = reactive([])

const getUserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    Object.assign(userInfo,user)
}

onMounted(() => {
    getUserInfo()
})
</script>

<style lang="scss" scoped>
.person-info{
    width: 100%;
    height: 100px;
    background-color: skyblue;
}
.avatar-build{
    width: 100%;
    height: 100%;
    background-color: pink;
    .avatar{
        width: 100%;
        height: 100%;
        transform: scale(1, .8) translateY(-82px);
    }
}
</style>