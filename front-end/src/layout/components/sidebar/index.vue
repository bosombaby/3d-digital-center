<template>
    <h2 class="title">三维数字化管理中心</h2>
    <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
      >
      <SideItem :list="menuList" />
    
    </el-menu>
    <!-- 版本管理 -->
    <div class="version">
      V 1.0.0
    </div>
</template>

<script setup>
import { useMenuStore } from '@/store'
import SideItem from './SideItem.vue'

let menuList = useMenuStore

</script>

<style lang="scss" scoped>
.el-menu{
  border: 0;
}
.title{
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background-color: rgba(0,0,0,0.1);
}
.icons{
  width: 16px;
  height: 16px;
}
.version{
  position: absolute;
  left: 50px;
  bottom: 0;
  font-size: 25px;
  color: red;
}
</style>