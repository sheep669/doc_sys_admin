/*
 * @Author: 刘洋
 * @Date: 2024-11-25 14:18:03
 * @LastEditTime: 2025-04-29 02:16:45
 * @Description: 
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

//打包state
function initState() {
    return {
        isCollapse: false,
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: null
    }
}
export const useAllDataStore = defineStore('allData', () => {
    //ref       类似state属性
    //computed  getters
    //function  actions
    const state = ref(initState())
    //tab选中
    function selectMenu(val) {
        if (val.name === 'home') {
            state.value.currentMenu = null
        } else {
            let index = state.value.tags.findIndex((item) => item.name === val.name)
            index === -1 ? state.value.tags.push(val) : ""
        }

    }
    function updateTags(tag) {
        let index = state.value.tags.findIndex((item) => item.name === tag.name)
        state.value.tags.splice(index, 1)
    }
    return { state, selectMenu, updateTags }
})