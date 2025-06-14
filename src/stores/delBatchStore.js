/*
 * @Author: 刘洋
 * @Date: 2025-02-22 15:41:38
 * @LastEditTime: 2025-02-22 18:04:28
 * @Description: 
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

//打包state
function initState() {
    return {
        delIds: []
    }
} 
export const useDelBatchStore = defineStore('delBatch', () => {
    const state = ref(initState())
    //清空选中的id
    const clearIds = () => {
        state.value.delIds = [];
    };
    // 添加 ID 的方法，接收一个 ID 数组
    const addIds = (newIds) => {
        console.log("newIds", newIds)
        newIds.forEach((id) => {
            if (!state.value.delIds.includes(id)) { // 检查是否已存在
                state.value.delIds.push(id); // 添加不重复的 ID
            }
        });
    };
    return { state, clearIds, addIds };
});