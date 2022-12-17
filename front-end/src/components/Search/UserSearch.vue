<template>
    <div class="layout">
        <el-input size="default" placeholder="请输入用户名" :prefix-icon="Search" style="width: 200px;" v-model="result" />
        <el-button type="primary" @click="searchData">搜索</el-button>
    </div>

</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useServerStore } from '@/store/'
import axios from 'axios';

const server = useServerStore()
const request = axios.create({
    baseURL: server.baseURL
})


const emits = defineEmits(['fuzzy'])



let result = ref('')

const searchData = async () => {
    if (result.value) {
        let target = `%${result.value}%`
        let res = await request.get('/user/fuzzy/search', { params: { target } })
        emits('fuzzy', res.data.data)
    } else {
        alert('输入不能为空！')
    }
}

</script>

<style lang="scss" scoped>

</style>