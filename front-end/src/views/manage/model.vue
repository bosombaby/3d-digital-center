<template>
    <div class="top-header">
        <div class="btn">
            <el-button type="primary" @click="updateAllModelInfo" >显示</el-button>
            <AddModel @update="updateAllModelInfo"/>
        </div>

        <div class="search">
            <ModelSearch @fuzzy="fuzzyModel"/>
        </div>
    </div>

    <div class="main-content">
        <el-table :data="modelList" style="width: 100%;" height="500">
            <el-table-column fixed prop="name" label="名称" width="150" />
            <el-table-column prop="first_category" label="一级分类" width="200" />
            <el-table-column  label="图片地址"  width="250">
                <template #default="scoped">
                    <img style="width:180px; height: 100px" :src="(url+scoped.row.photo_url)" />
                </template>
            </el-table-column>
            
            <el-table-column prop="tag" label="标签" width="250" />
            <el-table-column prop="owner" label="上传者" width="120" />

            <el-table-column fixed="right" label="选项" width="200">
                <template #default="scoped">
                    <el-button type="primary" @click="turnDisplayPage(scoped.row.model_url)">查看</el-button>
                    <el-button type="danger" @click="deleteModel(scoped.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="confirmDialogVisible" title="警告" width="30%"  align-center>
        <span>
            模型资源删除之后不可恢复，是否删除？
        </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="confirmDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="confirmDelete">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import ModelSearch from '@/components/Search/ModelSearch.vue'

import { reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, useServerStore } from '@/store/'
import { customAlphabet } from 'nanoid'
import axios from 'axios'

//插入添加框
import AddModel from './components/AddModel.vue'

const router = useRouter()

//全局数据
const server=useServerStore()

const url = ref(server.baseURL)
const request = axios.create({
    baseURL: url.value
})

const { proxy } = getCurrentInstance()

const confirmDialogVisible = ref(false)

//模型信息 只开放一级分类
const modelList = reactive([])
const model = reactive({ id: '', name: '', first_category: '', photo_url: '', model_url: '', tag: '', owner: '' })

const getAllModelInfo = async () => {
    const res = await request.get('/models')
    modelList.push(...res.data.data)
}

const updateAllModelInfo = async () => {
    modelList.splice(0,modelList.length)
    await getAllModelInfo()
}

const fuzzyModel = async (data) => {
    modelList.splice(0)
    modelList.push(...data)
}

// 模型查看
const turnDisplayPage = (value) => {
    const routeData = router.resolve({ path: '/display', query: { url: value } })
    window.open(routeData.href, '_blank')
}

const deleteModel = async (value) => {
    confirmDialogVisible.value = true
    Object.assign(model,value)
}

const confirmDelete = async () => {
    //删除数据库
    const res = await request.post('/db/delete/model', { id: model.id })

    // 删除文件夹
    const relativePath = `/${model.first_category}/${model.name}`
    await request.post('/delete/model', { relativePath })
    if (res.data.isDelete) {
        alert('删除成功！')
    }
    updateAllModelInfo()
    confirmDialogVisible.value = false
}
onMounted(() => {
    getAllModelInfo()
})

</script>

<style lang="scss" scoped>
.top-header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    background-color: skyblue;
    .btn{
        display: flex;
        width: 15%;
        height: 100%;
        justify-content: space-between;
        align-items: center;

    }
}
</style>