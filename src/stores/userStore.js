/*
 * @Author: 刘洋
 * @Date: 2025-02-22 15:41:38
 * @LastEditTime: 2025-03-23 13:56:05
 * @Description: 
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

//打包state
function initState() {
    return {
        user: {}, // 用户信息
        token: '' // 身份验证令牌
    }
}
export const useUserStore = defineStore('userStore', () => {

    const state = ref(initState())

    //设置用户信息
    const setUser = (userInfo) => {
        state.value.user = userInfo;
    }
    // 设置 token
    const setToken = (tokenInfo) => {
        state.value.token = tokenInfo;
    };

    // 清除用户信息
    const clearUser = () => {
        state.value.user = {};
        state.value.token = '';
    };
    return { state, setUser, setToken, clearUser };
});