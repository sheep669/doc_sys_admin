<!--
 * @Author: 刘洋
 * @Date: 2025-02-23 09:04:11
 * @LastEditTime: 2025-02-23 11:07:01
 * @Description: 
-->
<template>
    <el-dialog :title="dialogTitle" v-model.sysn="modelValue" :close-on-click-modal="false" @close="handleCloseDialog"
        :width="620" class="custom-dialog">
        <el-form :model="formData" ref="formRef" label-width="120px">
            <el-form-item label="病例编号" prop="id">
                <el-input v-model="formData.id" placeholder="请输入病例编号" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="病人姓名" prop="name">
                <el-input v-model="formData.name" placeholder="请输入病人姓名" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="formData.gender" placeholder="请选择性别" class="input-field">
                    <el-option label="男" value="male"></el-option>
                    <el-option label="女" value="female"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入联系电话" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="address">
                <el-input v-model="formData.address" placeholder="请输入住址" class="input-field"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <el-button type="primary" @click="handleSubmit">确认</el-button>
                    <el-button @click="resetForm" style="margin-left: 10px;">重置</el-button>
                </div>
                <el-button type="danger" @click="handleCloseDialog" style="margin-left: 10px;">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// 定义接收的 props
const props = defineProps({
    dialogTitle: {
        type: String,
        required: true,
    },
    closeDialog: {
        type: Function,
        required: true,
    },
    resetForm: {
        type: Function,
        required: true,
    },
    submitForm: {
        type: Function,
        required: true,
    }
});
const modelValue = ref(false);
// 定义发出的事件
const emit = defineEmits(['update:modelValue']);

const formData = ref({
    id: '',
    name: '',
    gender: '',
    phone: '',
    address: ''
});

// 提交表单
const handleSubmit = () => {
    console.log("提交的表单数据:", formData.value);
    props.submitForm(); // 调用外部传入的 submitForm 方法
    emit('update:modelValue', false); // 提交后关闭对话框
};

// 关闭对话框
const handleCloseDialog = () => {
    emit('update:modelValue', false); // 关闭时发出事件
    props.resetForm(); // 关闭时重置表单
};
</script>

<style scoped>
.custom-dialog .el-dialog {
    border-radius: 10px;
    /* 圆角 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    /* 阴影 */
}

.custom-dialog .el-dialog__header {
    background-color: #f5f5f5;
    /* 头部背景色 */
    border-bottom: 1px solid #e4e4e4;
    /* 头部底部边框 */
}

.custom-dialog .el-dialog__title {
    font-weight: bold;
    /* 加粗标题 */
    color: #333;
    /* 标题颜色 */
}

.custom-dialog .el-dialog__body {
    padding: 20px;
    /* 内容内边距 */
}

.input-field {
    max-width: 400px;
    /* 设置最大宽度 */
    width: 100%;
    /* 使输入框宽度自适应 */
}
</style>