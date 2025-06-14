/*
 * @Author: 刘洋
 * @Date: 2025-02-25 19:10:54
 * @LastEditTime: 2025-03-17 17:24:22
 * @Description: 
 */
// src/stores/statusStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

//打包state
function initState() {
    return {
        isFavorited: [
            { label: "是", value: 1 },
            { label: "否", value: 0 },
        ],
        status: [
            { label: "已取消", value: 0 },
            { label: "未确认", value: 1 },
            { label: "已确认", value: 2 },
        ],
        bookStatus: [
            { label: "已取消", value: 0 },
            { label: "待就诊", value: 1 },
            { label: "已完成", value: 2 },
        ],
        paidStatus: [
            { label: "待支付", value: 0 },
            { label: "已支付", value: 1 },
        ],
        orderStatus: [
            { label: "待支付", value: 0 },
            { label: "已发货", value: 1 },
            { label: "已完成", value: 2 },
        ],
        departmentId: [
            { label: "内科", value: 1 },
            { label: "外科", value: 2 },
            { label: "儿科", value: 3 },
            { label: "妇产科", value: 4 },
            { label: "眼科", value: 5 },
            { label: "耳鼻猴科", value: 6 },
            { label: "皮肤科", value: 7 },
            { label: "口腔科", value: 8 },
            { label: "急诊科", value: 9 },
            { label: "中医科", value: 10 }
        ],

    }
}
export const useStatusStore = defineStore('status', () => {
    const state = ref(initState())
    return { state };
});