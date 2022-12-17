<template>
  <Space>
    <div class="ve_container">
      <el-card :body-style="{ background: 'rgba(0,0,0,0.15)' }">
        <h1>三维数字化开发中心</h1>
        <transition name="el-fade-in-linear">
        <el-form :model="loginForm" class="ve_form " ref="form">
            <!-- 账户 -->
            <el-form-item  prop="username" :rules="[{ required: true, message: '账号不能为空', trigger: 'blur' }]">
              <el-input v-model=loginForm.username placeholder="账号">
                <template #prepend>
                  <el-icon :size="20">
                    <Avatar />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item  prop="password" :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]">
              <el-input v-model="loginForm.password"  placeholder="密码">
                <template #prepend>
                  <el-icon :size="20">
                    <Key />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button class="ve_submit" type="primary" @click="checkInfo">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </transition>
      </el-card>
    </div>
  </Space>
</template>

<script setup>
import {  reactive, getCurrentInstance,ref,toRefs } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import Space from './components/Space.vue'
import { useUserStore, useServerStore } from '@/store/'

import axios from 'axios'


const store = useUserStore()
const serverStore=useServerStore()
const { proxy } = getCurrentInstance()

const loginForm = reactive({
  id: '', username: 'super', password: '123456', level: 0
})

const router = useRouter()

const request = axios.create({
  baseURL: serverStore.baseURL
})

//账号验证
const checkInfo = () => {
  //服务端验证账号密码
  proxy.$refs.form.validate(async (valid, fields) => {
    if (valid) {
      let userData = {}
      let res = await request.post('/user/login', { username: loginForm.username, password: loginForm.password })
      if (!res.data.data.length) {
        alert('用户名或者密码错误！')
      } else {
        console.log(res.data.data[0]);
        Object.assign(store, res.data.data[0])
        // 持久化登录
        
        router.push({ name: 'dashboard' }) 
      }
    }
    else {
      alert('数据不合法！')
    }
  })

}

//账号注册
/* const enterRegister = async () => {
  router.push({ path: '/register' })
} */

</script>

<style lang="scss" scoped>
.ve_container {
  position: absolute;
  z-index: 1;
  width: 400px;
  top: 50%;
  left: 100px;
  transform: translateY(-50%);
  transition: all 1s;
  min-height: 273px;
  text-align: center;

  h1 {
    font-size: 24px;
    transition: all 1s;
    font-weight: bold;
    margin-bottom: 36px;
  }

  .ve_form {
    .ve_submit {
      width: 100%;
    }

    :deep(.el-input-group__prepend) {
      padding: 0 10px;
    }
  }
}
</style>