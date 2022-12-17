<template>
    <div class="nav-menu">
        <div class="menu">
            <el-button v-for="(item, index) in firstCategory" text :key="index" @click="classifyModel(item)">
                {{ item }}
            </el-button>
            <ModelSearch @fuzzy="fuzzyModel" class="search-layout"/>
        </div>
    </div>
    <div class="main">
        <ul class="model-all">
            <el-card v-for="(item, index) in  sourceArr" :key="index" class="model-single" shadow="hover" :body-style="{ padding: '10px' }">
                <img style="width: 100%; height: 200px;display: block;" :src="requestURL + item.photo_url">
                <!-- <el-image style="width: 250px; height: 200px" :src="requestURL + item.photo_url" /> -->
                
                <!-- 描述信息 -->
                <div class="description">
                    <h4 class="title">名称:{{item.name}}</h4> 
                    <div class="tag">标签:{{item.tag}}</div>
                    <div class="owner">上传:{{item.owner}}</div>
                </div>
                <div class="btn-choice">
                    <el-button type="primary" round style="margin-top: 20px;"
                        @click="turnDisplayPage(item)">查看</el-button>
                    <el-button type="success" round style="margin-top: 20px;"
                        @click="downloadModel(requestURL + item.model_url)">下载</el-button>
                </div>

            </el-card>
        </ul>
    </div>
</template>

<script setup>
import axios from 'axios'
import { reactive, onBeforeMount ,ref} from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useServerStore } from '@/store/'
import ModelSearch from '@/components/Search/ModelSearch.vue'


const userStore = useUserStore()
const server = useServerStore()
const router = useRouter()

const requestURL = ref(server.baseURL)

//后端请求数据
const request = axios.create({
    baseURL: server.baseURL

})
//a标签下载模型
const a = document.createElement('a')


//模型资源
const sourceArr = reactive([
])
//模型一级分类标签
const firstCategory = reactive(['全部', '人物模型', '动物模型', '植物模型', '场景模型', '家具家居', '交通运输', '军事武器', '其它', '我的'])

//初始获取所有模型信息
const getAllModelInfo = async () => {
    const res = await request.get('/models')
    sourceArr.push(...res.data.data)
}

// 跳转到模型编辑页面
const turnDisplayPage = (value) => {
    const routeData = router.resolve({ path: '/display', query: { url: value.model_url } })
    window.open(routeData.href, '_blank')

}

// 下载模型
const downloadModel = (path) => {
    a.href = path
    a.click()
}

//一级菜单分类
const classifyModel = async (target) => {
    sourceArr.splice(0)
    if (target === '全部') {
        getAllModelInfo()
    } else if (target === '我的') {

        target = userStore.username
        const res = await request.get('/model/category/mine', { params: { target } })
        sourceArr.push(...res.data.data)
    }
    else {
        const res = await request.get('/model/category/first', { params: { target } })
        sourceArr.push(...res.data.data)
    }
}

const fuzzyModel = async (data) => {
    console.log(111);
    sourceArr.splice(0)
    sourceArr.push(...data)
}
//创建之前
onBeforeMount(() => {
    getAllModelInfo()
})

</script>

<style lang="scss" scoped>
.nav-menu {
    position: fixed;
    width: 100%;
    background-color: #fff;
    height: 50px;
    background-color: darksalmon;
    .menu{
        display: flex;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
        .search-layout{
            margin-left: 180px;
        }
    }
}

.main {
    margin-top: 50px;
   
    background-color: rgba(255, 192, 203, 0.8);
}
.model-all {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    :deep(.el-card){
        background-color: rgba(255, 192, 203, 0.4);
    }
}

.model-single {
    display: flex;
    flex-direction: column;
    width: 275px;
    margin: 25px 0;
    .description{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 80px;
        margin-top: 10px;
        border: 1px solid #ccc;
        .title{
            font-size: 16px;
            font-weight: 700;
            color: #222;
        }
        .tag,.owner{
            font-size: 12px;
            color: #666;
        }
    }
    .btn-choice {
        display: flex;
        height: 50px;
        justify-content: space-around;
        align-items: center;
    }
}
</style>