<!--
 * @Author: 刘洋
 * @Date: 2024-11-26 13:40:02
 * @LastEditTime: 2025-04-29 02:09:54
 * @Description: 
-->
<template>
    <div class='tabs'>
        <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name != 'home'"
            :effect="route.name === tag.name ? 'dark' : 'plain'" @click="handleSelectTab(tag)"
            @close="closeTab(tag, index)">{{
                tag.label }}</el-tag>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores'

const store = useAllDataStore()
const tags = computed(() => store.state.tags)
const route = useRoute()
const router = useRouter()
const handleSelectTab = (tab) => {
    router.push(tab.name)
    store.selectMenu(tab)
}
const closeTab = (tag, index) => {
    //通过pinia关闭
    store.updateTags(tag)
    //
    if (tag.name !== route.name) return
    if (index === store.state.tags.length) {
        store.selectMenu(tags.value[index - 1])
        router.push(tags.value[index - 1].name)
    } else {
        store.selectMenu(tags.value[index])
        router.push(tags.value[index].name)
    }
}
</script>

<style lang='less' scoped>
.tabs {
    margin: 10px 0 0 10px;
}

.el-tag {
    margin-right: 10px;
}
</style>