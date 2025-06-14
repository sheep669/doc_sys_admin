<!--
 * @Author: 刘洋
 * @Date: 2024-11-21 23:21:33
 * @LastEditTime: 2025-02-22 18:13:48
 * @Description: 
-->
<template>
    <el-container class="layout-container">
        <common-aside></common-aside>
        <el-container>
            <el-header>
                <common-header></common-header>
            </el-header>
            <common-tab class="common-tab"></common-tab>
            <el-main class="main-content">
                <div class="content-wrapper">
                    <!-- 路由展示 -->
                    <router-view></router-view>
                </div>
            </el-main>
            <el-footer class="footer-content">
                Copyright © 2025 Designed by 刘洋 All Rights Reserved
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonTab from '../components/CommonTab.vue';
</script>

<style lang="less" scoped>
.common-tab {
    margin-bottom: 20px; /* 为 common-tab 添加底部间距 */
}

.layout-container {
    height: 100%;
    display: flex; /* 使用 Flexbox */
}

.el-container {
    flex: 1; /* 使 el-container 填满剩余空间 */
}

.el-header {
    background-color: #fff;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加边框阴影 */
}

.main-content {
    flex: 1; /* 使 el-main 填满剩余空间 */
    display: flex; /* 使用 Flexbox */
    flex-direction: column; /* 垂直排列内容 */
    overflow-y: auto; /* 允许垂直滚动 */
    padding: 20px; /* 添加内边距 */
}

.content-wrapper {
    flex: 1; /* 使内容区域填满剩余空间 */
    display: flex; /* 使用 Flexbox */
    flex-direction: column; /* 垂直排列内容 */
    justify-content: flex-start; /* 从顶部开始排列 */
    width: 100%; /* 确保内容宽度 */
    max-width: 1200px; /* 设置最大宽度 */
    margin: 0 auto; /* 居中内容 */
}

.footer-content {
    display: flex; /* 使用 Flexbox */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    height: 60px; /* 设置 footer 高度 */
    background-color: #f5f5f5; /* 可选：设置背景色 */
}
</style>