<template>
    <div class="top-header">
        <div class="btn">
            <el-button type="primary" @click="getUsers">显示</el-button>
            <el-button type="primary" @click="insertUser">新增+</el-button>
        </div>

        <div class="search">
            <UserSearch @fuzzy="fuzzyUser"/>
        </div>
    </div>

    <div class="main-content">
        <el-table :data="userList" style="width: 100%" height="500">
            <el-table-column fixed prop="username" label="用户名" width="150" />
            <el-table-column prop="password" label="密码" width="120" />
            <el-table-column prop="level" label="等级" width="120" />
            <el-table-column fixed="right" label="选项" width="200">
                <template #default="scoped">
                    <el-button type="primary" @click="getRowInfo(scoped.row)">查看</el-button>
                    <el-button type="danger" @click="deleteUser(scoped.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    

    <!-- 对话框 -->

    <el-dialog
        v-model="dialogVisible"
        :title="(state == 'insert' ? '添加用户' : '查看用户') "
        width="30%"
    >
        <el-form label-width="80px" :model="newUser" :rules="rules" ref="userForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model.trim="newUser.username"  />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model.trim="newUser.password" />
            </el-form-item>
            <el-form-item label="等级" prop="level">
                <el-select v-model="newUser.level" class="m-2" placeholder="等级选择">
                    <el-option value="0" />
                    <el-option value="1" v-show="(isOptionShow==2)"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="exitForm">退出</el-button>
                <el-button type="primary" @click="changeInfo">确定</el-button>
            </el-form-item>
        </el-form>
        
  </el-dialog>

</template>

<script setup>
import UserSearch from '@/components/Search/UserSearch.vue';
import { reactive, onMounted, ref, getCurrentInstance } from 'vue';
import { useUserStore, useServerStore } from '@/store/'
import { customAlphabet } from 'nanoid'
import axios from 'axios'



const {proxy}=getCurrentInstance()

//权限检查
let store = useUserStore()
const serverStore = useServerStore()

const request = axios.create({
    baseURL: serverStore.baseURL
})
const rank = store.level
const isOptionShow=ref(rank)
const username=store.username
const rankCheck = (value) => {
    if (value === 2) {
        return false
    }
    if (rank <= value) {
        // console.log(rank,value);
        return false
    } 

    return true
}

//判断是新增用户还是修改用户信息
const state=ref('insert')

//创建用户id
const createId = () => {
    const nanoid = customAlphabet('vr@team_123456789', 15)
    return nanoid()
}


//所有用户
const userList = reactive([])
//新用户
const newUser = reactive({
    id: '',
    username: '',
    password: '',
    level:0
})

const resetUser = reactive({
    id: '',
    username: '',
    password: '',
    level: 0
})

//规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度3-10', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '密码长度3-10', trigger: 'blur' },
    ]
})

//对话框
const dialogVisible = ref(false)

//获取所有用户
const getUsers = async () => {
    userList.splice(0)
    const res = await request.get('/users')
    
    userList.push(...res.data.data)
    // console.log(userList);
}

//获取表格单行用户
const getRowInfo = (row) => {
    if (rankCheck(row.level)) {
        state.value = 'change'
        Object.assign(newUser, row)
        dialogVisible.value = true
    } else {
        alert('权限不足！')
    }
}

//删除用户信息
const deleteUser = async (row) => {
    const level = row.level
    if (rankCheck(level) ) {
        const res = await request.post('/user/delete', { id: row.id })
        alert(res.data.msg)
        getUsers()
    } else {
        alert('权限不足！')
    }
    
    
}

//添加用户信息
const insertUser = () => {
    state.value = 'insert'
    Object.assign(newUser, resetUser)
    dialogVisible.value = true
}

//退出对话框
const exitForm = () => {
    dialogVisible.value = false
}

//修改信息
const changeInfo = async () => {

    
    proxy.$refs.userForm.validate(async (valid, fields) => {
        if (valid) {
            // 用户名预检查
            const preCheck = await request.get('/user/check', { params: { username: newUser.username } })
            const isOnly = preCheck.data.isOnly
            if (isOnly) {

                if (state.value === 'change') {
                    const res = await request.post('/user/update', newUser)
                    alert(res.data.msg)
                } else {

                    newUser.id = createId()
                    const res = await request.post('/user/register', newUser)
                    alert(res.data.msg)
                }
                dialogVisible.value = false
                getUsers()
            }
            else {
                alert('用户名已存在，请重新输入！')
            } 
        } else {
            alert('数据不合理！')
        }
    })
}

const fuzzyUser = async (data) => {
    userList.splice(0)
    userList.push(...data)
}
onMounted(() => {
    getUsers()
})



</script>

<style lang="scss" scoped>
.top-header{
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    background-color: skyblue;
}
:deep(.dialog-btn)
{
    display: flex;
    justify-content: flex-end !important;
}
</style>