<!--
 * @Author: 刘洋
 * @Date: 2024-11-23 00:21:12
 * @LastEditTime: 2025-04-29 01:49:15
 * @Description: 
-->
<template>
    <el-aside :width="width" class="el-aside">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            :collapse="isCollapse" :collapse-transition="false">
            <h3 v-show="!isCollapse" style="margin-right:30px;">智慧医疗系统</h3>
            <img v-show="isCollapse" class="xtLogo" :src="getImageUrl('xtLogo')" />
            <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="handleMenu(item)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path"
                        @click="handleMenu(subItem)">
                        <component class=" icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>


<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "../stores/index"
import { useRouter, useRoute } from "vue-router";
const list = ref([
    {
        path: '/main/home',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: 'home',
        roles: ['admin', 'doctor', 'patient']
    },
    {
        path: '/main/doctor',
        label: '医生管理',
        icon: 'DataLine',
        roles: ['admin'],
        children: [
            {
                path: '/main/doctorInfo',
                name: 'doctorInfo',
                label: '医生信息',
                icon: 'Tickets',
                url: 'doctorInfo',
                roles: ['admin']
            }
        ]
    },
    {
        path: '/main/patientManage',
        name: 'patientManage',
        label: '病患管理',
        icon: 'FolderAdd',
        url: 'patientManage',
        roles: ['admin', 'doctor']
    },
    {
        path: '/main/orderManage',
        label: '订单管理',
        icon: 'FirstAidKit',
        roles: ['admin'],
        children: [
            {
                path: '/main/bookingOrder',
                name: 'bookingOrder',
                label: '预约订单',
                icon: 'Tickets',
                url: 'bookingOrder',
                roles: ['admin']
            }
        ]
    },
    {
        path: '/main/knowledgeQuestion',
        label: '知识问答',
        icon: 'FirstAidKit',
        roles: ['admin', 'doctor'],
        children: [
            {
                path: '/main/knowledgeQuestionManage',
                name: 'knowledgeQuestionManage',
                label: '知识问答管理',
                icon: 'Tickets',
                url: 'knowledgeQuestionManage',
                roles: ['admin', 'doctor']
            }
        ]
    },
    {
        path: '/main/healthInformation',
        label: '健康资讯',
        icon: 'FirstAidKit',
        roles: ['admin', 'doctor'],
        children: [
            {
                path: '/main/healthInformationManage',
                name: 'healthInformationManage',
                label: '健康资讯管理',
                icon: 'Tickets',
                url: 'healthInformationManage',
                roles: ['admin', 'doctor']
            }
        ]
    },
    {
        path: '/main/departmentManage',
        name: 'departmentManage',
        label: '科室管理',
        icon: 'FirstAidKit',
        url: 'departmentManage',
        roles: ['admin']
    },
    {
        path: '/main/appointmentManage',
        name: 'appointmentManage',
        label: '预约管理',
        icon: 'Clock',
        url: 'appointmentManage',
        roles: ['admin', 'doctor']
    },
    {
        path: '/main/onlineConsultation',
        name: 'onlineConsultation',
        label: '在线咨询',
        icon: 'Phone',
        url: 'onlineConsultation',
        roles: ['patient']
    }
])
const router = useRouter()
const route = useRoute()
const role = ref(localStorage.getItem("role"))
if (role === null || role === "") {
    router.push("/login")
}

const filteredList = computed(() => {
    return list.value.filter(item => {
        if (!item.roles || !item.roles.includes(role.value)) {
            return false
        }
        if (item.children) {
            const filteredChildren = item.children.filter(child =>
                child.roles && child.roles.includes(role.value)
            )
            return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : false
        }
        return true
    })
})

const noChildren = computed(() => filteredList.value.filter(item => !item.children))
const hasChildren = computed(() => filteredList.value.filter(item => item.children))
const getImageUrl = (xtLogo) => {
    return new URL(`../assets/images/${xtLogo}.png`, import.meta.url).href
}
const store = useAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => store.state.isCollapse ? "64px" : "180px")
const activeMenu = computed(() => route.path)
const handleMenu = (val) => {
    router.push(val.path)
    //添加tab
    store.selectMenu(val)
}

</script>

<style lang="less" scoped>
//设置图标的大小和位置
.icons {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.xtLogo {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-top: 10px;
}

.el-menu {
    border-right: none;

    h3 {
        line-height: 48px;
        color: #fff;
        text-align: center;
    }
}

//设置左侧的栏目的高度，100%就是从底到顶的高度
.el-aside {
    height: 100%;
    background-color: #545c64;
}

.el-aside {
    transition: width 0.01s;
}
</style>