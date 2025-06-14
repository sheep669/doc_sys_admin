/*
 * @Author: sheep669
 * @Description: 请求api的请求常量
 * @Date: 2022-08-06 20:40:43
 */

/**
 *   操作patient
 */
const patient = {
    addUrl: '/patient/add',
    updateUrl: '/patient/update',
    deleteUrl: '/patient/delete',
    searchOrGetPageList: '/patients/page/get',
    deleteBatchUrl: '/patients/deleteBatch',
}
/**
 *   操作doctor
 */
const doctor = {
    addUrl: '/doctor/add',
    updateUrl: '/doctor/update',
    deleteUrl: '/doctor/delete',
    searchOrGetPageList: '/doctors/page/get',
    deleteBatchUrl: '/doctors/deleteBatch',
}
/**
 *   操作department
 */
const department = {
    addUrl: '/department/add',
    updateUrl: '/department/update',
    deleteUrl: '/department/delete',
    searchOrGetPageList: '/departments/page/get',
    deleteBatchUrl: '/departments/deleteBatch',
}
/**
 *   操作dailyQuestions
 */
const dailyQuestions = {
    addUrl: '/dailyQuestions/add',
    updateUrl: '/dailyQuestions/update',
    deleteUrl: '/dailyQuestions/delete',
    searchOrGetPageList: '/dailyQuestionss/page/get',
    deleteBatchUrl: '/dailyQuestionss/deleteBatch',
}
/**
 *   medicine
 */
const medicine = {
    addUrl: '/medicine/add',
    updateUrl: '/medicine/update',
    deleteUrl: '/medicine/delete',
    searchOrGetPageList: '/medicines/page/get',
    deleteBatchUrl: '/medicines/deleteBatch',
}
/**
 *   healthInformation
 */
const healthInformation = {
    addUrl: '/healthInformation/add',
    updateUrl: '/healthInformation/update',
    deleteUrl: '/healthInformation/delete',
    searchOrGetPageList: '/healthInformations/page/get',
    deleteBatchUrl: '/healthInformations/deleteBatch',
}
/**
 *   appointment
 */
const appointment = {
    addUrl: '/appointment/add',
    updateUrl: '/appointment/update',
    deleteUrl: '/appointment/delete',
    searchOrGetPageList: '/appointments/page/get',
    deleteBatchUrl: '/appointments/deleteBatch',
}
/**
 *   medicineOrder
 */
const medicineOrder = {
    addUrl: '/medicineOrder/add',
    updateUrl: '/medicineOrder/update',
    deleteUrl: '/medicineOrder/delete',
    searchOrGetPageList: '/medicineOrders/page/get',
    deleteBatchUrl: '/medicineOrders/deleteBatch',
}
/**
 *   appointmentPayment
 */
const appointmentPayment = {
    addUrl: '/appointmentPayment/add',
    updateUrl: '/appointmentPayment/update',
    deleteUrl: '/appointmentPayment/delete',
    searchOrGetPageList: '/appointmentPayments/page/get',
    deleteBatchUrl: '/appointmentPayments/deleteBatch',
}
/**
 *   article
 */
const article = {
    addUrl: '/article/add',
    updateUrl: '/article/update',
    deleteUrl: '/article/delete',
    searchOrGetPageList: '/articles/page/get',
	searchTab:'article/getTab',
    deleteBatchUrl: '/articles/deleteBatch',
    getArticlesByTabName: '/article/getArticlesByTabName',
    getArticleDetail: '/article/getArticleDetailById',
}


export default {
    patient,doctor,department,dailyQuestions,medicine,healthInformation,appointment,medicineOrder,appointmentPayment,article
    // appointment,
    // appointment_payment, department, doctor, health_article, hospitalization_deposit, medicine, medicine_order, patient, sys_user, test_report
} 