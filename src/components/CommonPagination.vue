<!--
 * @Author: sheep669
 * @Description: 分页组件
 * @Date: 2022-06-26 23:27:23
-->
<template>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :page-sizes="[8, 16, 32]" :page-size="pageSize"
        layout="total,sizes,prev,pager,next,jumper" :total="total" hide-on-single-page
        :i18n="{
            total: '共 {total} 条',
            itemsPerPage: '每页 {size} 条',
            prev: '上一页',
            next: '下一页',
            jumpTo: '跳至',
            jumpToConfirm: '确定',
            page: '页'
        }">
    </el-pagination>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 8,
    },
    total: {
        type: Number,
        default: 0,
    },
    onPageChange: {
        type: Function,
        required: true,
    },
    onSizeChange: {
        type: Function,
        required: true,
    },
});

const emit = defineEmits(['size-change', 'current-change']);

// 处理页面大小变化
const handleSizeChange = (size) => {
    emit('size-change', size); // 触发外部传入的 size-change 方法
    props.onSizeChange(size); // 调用外部传入的 onSizeChange 方法
};

// 处理当前页变化
const handleCurrentChange = (page) => {
    emit('current-change', page); // 触发外部传入的 current-change 方法
    props.onPageChange(page); // 调用外部传入的 onPageChange 方法
};
</script>

<style scoped></style>
