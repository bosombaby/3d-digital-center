<template>
    <div class="app-wrapper">
        <div class="layout-section">
            <!-- 左侧菜单 -->
            <div class="sidebar-container">
                <SideBar />
            </div>
            <!-- 右侧展示区 -->
            <div class="main-container">
                <!-- 首部固定 -->
                <div class="fixed-header">
                    <!-- 头部 -->
                    <div class="nav-bar">
                        <NavBar />
                    </div>
                    <!-- tags标签 -->
                    <!-- <div class="scroll-bar">
                        <TagsView />
                    </div> -->
                </div>

                <!-- 中间展示 -->
                <div class="middle-show">
                    <AppMain />
                </div>

                <!-- 右侧设置组件 -->
                <div class="rigth-set" >
                    <Settings />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { NavBar, AppMain, SideBar, TagsView, Settings } from './components'
</script>

<style lang="scss" scoped>
@import '../styles/layout.scss'

</style>