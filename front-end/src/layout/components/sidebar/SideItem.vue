<template>
    
    <template v-for="item in list">
        <!-- 一级菜单 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.index" @click="turnPage(item.name)">
                <component class="icon" :is="item.icon"></component>
                <span>{{item.title}}</span>
            </el-menu-item>
        </template>

        <!-- 多级菜单 -->
        <template v-else>
            <el-sub-menu :index="item.index">
                <!-- 标题 -->
                <template #title>
                    <component class="icon" :is="item.icon"></component>
                    <span>{{item.title}}</span>
                </template>
                
                <!-- 是否还有子菜单 -->
                <SideItem :list="item.children"></SideItem>
            </el-sub-menu>
        </template>

    </template>
</template>

<script setup>
import { onMounted } from 'vue'
import {useRouter} from 'vue-router'

const props = defineProps(['list'])

const router = useRouter()

const turnPage = (value) => {
    router.push({name:value})
}





</script>

<style lang="scss" scoped>
.icon{
    width: 16px;
    height: 16px;
}
</style>