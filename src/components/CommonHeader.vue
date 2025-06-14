<!--
 * @Author: 刘洋
 * @Date: 2024-11-23 00:21:12
 * @LastEditTime: 2025-04-29 01:46:50
 * @Description: 
-->
<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu" />
            </el-button>
            <!-- <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
            </el-breadcrumb> -->
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" :src="getImageUrl('user')" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout">
                            退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>
import { useAllDataStore } from "@/stores/index"
import { useRouter } from "vue-router";
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}


const store = useAllDataStore()
const handleCollapse = () => {
    store.state.isCollapse = !store.state.isCollapse;
}
const router = useRouter()

const logout = () => {
    localStorage.removeItem("role");
    router.push("/login");
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #000;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.icons {
    width: 20px;
    height: 20px;
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
        color: #000;
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

:deep(.bread span) {
    cursor: pointer !important;
    color: #000 !important;
}
</style>