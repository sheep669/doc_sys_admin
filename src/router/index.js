/*
 * @Author: 刘洋
 * @Date: 2024-11-21 23:17:18
 * @LastEditTime: 2025-04-29 01:02:41
 * @Description: 
 */
import { createRouter, createWebHashHistory } from "vue-router";
//制定路由规则

const routes = [
    {
        path: "/",
        redirect: "/login"  // 默认重定向到登录页
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/Login.vue')
    },
    {
        path: "/register",
        name: "register",
        component: () => import('@/views/Register.vue')
    },
    {
        path: "/main",  
        name: "main",
        component: () => import('@/views/Main.vue'),
        redirect: "/main/home",
        children: [
            {
                path: "home",
                name: "home",
                component: () => import('@/views/Home.vue')
            },
            {
                path: "/main/doctorInfo",
                name: "doctorInfo",
                component: () => import('@/views/DoctorInfo.vue')
            },
            {
                path: "/main/doctorSchedule",
                name: "doctorSchedule",
                component: () => import('@/views/DoctorSchedule.vue')
            },
            {
                path: "/main/patientManage",
                name: "patientManage",
                component: () => import('@/views/PatientManage.vue')
            },
            {
                path: "/main/onlineConsultation",
                name: "onlineConsultation",
                component: () => import('@/views/OnlineConsultation2.vue')
            },
            {
                path: "/main/bookingOrder",
                name: "bookingOrder",
                component: () => import('@/views/BookingOrder.vue')
            },
            {
                path: "/main/medicineInfo",
                name: "medicineInfo",
                component: () => import('@/views/MedicineInfo.vue')
            },
            {
                path: "/main/medicineInventory",
                name: "medicineInventory",
                component: () => import('@/views/MedicineInventory.vue')
            },
            {
                path: "/main/electronicPrescription",
                name: "electronicPrescription",
                component: () => import('@/views/ElectronicPrescription.vue')
            },
            {
                path: "/main/drugOrder",
                name: "drugOrder",
                component: () => import('@/views/DrugOrder.vue')
            },
            {
                path: "/main/knowledgeQuestionManage",
                name: "knowledgeQuestionManage",
                component: () => import('@/views/KnowledgeQuestionManage.vue')
            },
            {
                path: "/main/healthInformationManage",
                name: "healthInformationManage",
                component: () => import('@/views/HealthInformationManage.vue')
            },
            {
                path: "/main/departmentManage",
                name: "departmentManage",
                component: () => import('@/views/DepartmentManage.vue')
            },
            {
                path: "/main/appointmentManage",
                name: "appointmentManage",
                component: () => import('@/views/AppointmentManage.vue')
            }
        ]
    },



]
const router = createRouter({
    //设置路由的模式
    history: createWebHashHistory(),
    routes
})

export default router;
