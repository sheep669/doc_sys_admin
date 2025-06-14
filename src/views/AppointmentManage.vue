<!--
 * @Author: 刘洋
 * @Date: 2024-11-28 18:18:18
 * @LastEditTime: 2025-03-17 17:27:30
 * @Description: 
-->
<template>
    <el-card shadow="always" body-style="0px"
        style="margin: 8px; width: 100%; position: relative; padding-bottom: 80px;">

        <div class="filter-form">
            <el-row>
                <el-col :span="1">
                    <el-tooltip effect="dark" content="刷新表格" placement="left-start">
                        <el-button @click="refreshTable" circle size="default"><el-icon>
                                <Refresh />
                            </el-icon></el-button>
                    </el-tooltip>
                </el-col>
                <el-col :span="13">
                    <el-form label-width="100px" class="emo-form-inline">
                        <el-form-item label="预约ID">
                            <el-input clearable v-model="requestConfig.form.id" placeholder="请输入预约ID"></el-input>
                        </el-form-item>
                        <el-form-item label="病人ID">
                            <el-input clearable v-model="requestConfig.form.patientId" placeholder="请输入病人ID"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <div class="searchBtn">
                        <el-button type="primary" :icon="Search" @click="searchData">
                            查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="batchBtn">
                        <el-button type="danger" :icon="Delete" @click="delBatch">批量删除</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="pull-right">
                        <el-button @click="handleAdd" type="danger" :icon="Plus">添加预约记录</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>

        <CommonTable :config="table_config" :tableData="table_data" :isShow="isShow" style="width: 100%;">
            <!-- 操作 -->
            <template #operation="slotData">
                <el-button size="small" @click="handleEdit(slotData.data.id, slotData.data)" :icon="Edit">编辑</el-button>
                <el-popconfirm @confirm="handleDelete(slotData.data.id)" confirm-button-text="确认"
                    cancel-button-text="取消" :icon="Warning" icon-color="red" title="确定删除吗?">
                    <template #reference>
                        <el-button style="margin-left: 4px" size="small" type="danger" :icon="Delete">删除</el-button>
                    </template>
                </el-popconfirm>

            </template>
        </CommonTable>

        <div class="pagination-container">
            <CommonPagination :currentPage="page.current" :pageSize="page.size" :total="total"
                :onPageChange="handlePageChange" :onSizeChange="handleSizeChange" />
        </div>
        <!-- <el-dialog :title="dialogTitle" v-model="dialogFormVisible" :fullscreen="false" :close-on-click-modal="false"
            @close="closeDialog">
            <el-form>
                <el-form-item label="病例编号 :" :label-width="formLabelWidth" v-if="editModel">
                    <span style="color: #f56c6c">{{ dialogConfig.id }}</span>
                </el-form-item>
                <el-form-item label="病人姓名 :" :label-width="formLabelWidth">
                    <el-input clearable v-model="dialogConfig.name" placeholder="请输入病人姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别 :" :label-width="formLabelWidth">
                    <el-input clearable v-model="dialogConfig.gender" placeholder="请输入性别"></el-input>
                </el-form-item>
                <el-form-item label="联系电话 :" :label-width="formLabelWidth">
                    <el-input clearable v-model="dialogConfig.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item style="display: flex; justify-content: center; align-items: center;">
                    <el-button type="primary" @click="doAddOrEdit">确认{{ dialogTitle }}</el-button>
                    <el-button v-if="!editModel" type="primary" @click="reset" style="margin-left: 10px;">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog> -->
        <!-- test -->
        <!-- <el-button type="primary" @click="openDialog">添加病患</el-button> -->
    </el-card>
    <!-- 不封装了 -->
    <!-- <appointmentFormDialog 
        v-model:modelValue="dialogVisible" 
        :dialogTitle="dialogTitle" 
        :closeDialog="closeDialog"
        :resetForm="resetForm" 
        :submitForm="submitForm" /> -->

    <el-dialog :title="dialogTitle" v-model="dialogVisible" :close-on-click-modal="false" @close="closeDialog"
        :width="620" class="custom-dialog">
        <el-form :model="dialogConfig" ref="formRef" label-width="120px">
            <el-form-item label="预约ID" prop="id" v-if="isEditModel">
                <el-input v-model="dialogConfig.id" placeholder="请输入预约ID" class="input-field" disabled></el-input>
            </el-form-item>
            <el-form-item label="病人ID" prop="patientId">
                <el-input v-model="dialogConfig.patientId" placeholder="请输入病人ID" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="医生ID" prop="doctorId">
                <el-input v-model="dialogConfig.doctorId" placeholder="请输入医生ID" class="input-field"></el-input>
            </el-form-item>
            <el-form-item label="预约时间 :">
                <el-date-picker v-model="dialogConfig.appointmentTime" type="datetime" placeholder="选择预约时间"
                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :clearable="true">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预约状态">
                <el-select v-model="currentAppointmentStatus" placeholder="请选择" clearable>
                    <el-option v-for="item in statusStore.state.status" :key="item.currentAppointmentStatus"
                        :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <el-button type="primary" @click="doAddOrEdit">确认{{ dialogTitle }}</el-button>
                    <el-button @click="resetForm" style="margin-left: 10px;" v-if="!isEditModel">重置</el-button>
                </div>
                <el-button type="danger" @click="closeDialog" style="margin-left: 10px;">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>

import constant from "@/constant/api/index";
import { useDelBatchStore } from '@/stores/delBatchStore'; // 引入 Pinia Store
import { useStatusStore } from '@/stores/statusStore'; // 引入 Pinia Store
import { reactive, ref } from 'vue'
import { Delete, Edit, Search, Refresh, Plus, Warning } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import CommonTable from '../components/CommonTable.vue';
import CommonPagination from '../components/CommonPagination.vue';
import {
    searchOrGetRequest,
    doDeleteRequest,
    doPostRequest,
} from "@/api/index";
//test
// import appointmentFormDialog from './appointmentFormDialog.vue';

const dialogVisible = ref(false); // 控制对话框的显示
const dialogTitle = ref(""); // 对话框标题
const isEditModel = ref(true); // 是否为编辑模式
const currentAppointmentStatus = ref(0); // currentAppointmentStatus
//表单数据
const dialogConfig = reactive({
    id: '',
    patientId: '',
    doctorId: '',
    appointmentTime: '',
    status: ''
});

// 打开对话框
const openDialog = () => {
    console.log("打开对话框");
    dialogVisible.value = true; // 将对话框设置为可见
};

// 关闭对话框
const closeDialog = () => {
    dialogVisible.value = false; // 将对话框设置为不可见
};

// 重置表单
const resetForm = () => {
    Object.keys(dialogConfig).forEach((key) => {
        dialogConfig[key] = "";
    });
    currentAppointmentStatus.value = 0;
};
//
const handleAdd = () => {
    isEditModel.value = false;
    resetForm();
    dialogVisible.value = true;
    dialogTitle.value = "添加预约记录";
};

const handleEdit = (id, data) => {
    console.log("编辑", id, data);

    isEditModel.value = true;

    dialogConfig.id = data.id;
    dialogConfig.patientId = data.patientId;
    dialogConfig.doctorId = data.doctorId;
    dialogConfig.appointmentTime = data.appointmentTime;

    currentAppointmentStatus.value = parseInt(data.status);
    dialogConfig.status = data.status;

    dialogVisible.value = true;
    dialogTitle.value = "编辑预约记录";
};

// 添加或编辑
const doAddOrEdit = () => {
    if (isEditModel.value) {
        //编辑模式
        let url_param = constant.appointment.updateUrl;
        let data_param = dialogConfig;
        console.log(data_param);
        data_param.status = currentAppointmentStatus.value;
        doPostRequest(url_param, data_param).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
                ElMessage({
                    message: "修改成功",
                    type: "success",
                    duration: 1600
                });
                dialogVisible.value = false;
                return;
            }
            if (res.data.code == 400) {
                ElMessage({
                    message: res.data.data.msg,
                    type: "warning",
                    duration: 1600
                });
            }
        });
    } else {
        //添加模式
        let url_param = constant.appointment.addUrl;
        let data_param = dialogConfig;
        console.log(data_param.id);
        data_param.status = currentAppointmentStatus.value;
        doPostRequest(url_param, data_param).then((res) => {
            if (res.data.code == 200) {
                ElMessage({
                    message: "添加成功",
                    type: "success",
                    duration: 1600
                });
                dialogVisible.value = false;
                return;
            }
            if (res.data.code == 400) {
                ElMessage({
                    message: res.data.data.msg,
                    type: "warning",
                    duration: 1600
                });
            }
        });
    }
};



const delBatchStore = useDelBatchStore(); // 使用 Pinia Store
const statusStore = useStatusStore();

const table_config = reactive({
    thead: [
        {
            label: "预约ID",
            prop: "id",
            fixed: "left",
            width: 70,
        },
        {
            label: "病人ID",
            prop: "patientId",
            width: 200,
        },
        {
            label: "医生ID",
            prop: "doctorId",
            width: 200,
        }, {
            label: "预约时间",
            prop: "appointmentTime",
            width: 200,
            type: "tag",
        }, {
            label: "预约状态",
            prop: "status",
            width: 300,
            type: "function",
            callback: (row, prop) => {
                const data = statusStore.state.bookStatus.filter(
                    (item) => item.value == row[prop]
                );
                if (data && data.length > 0) {
                    return data[0].label;
                }
            },
        },
        {
            label: "操作",
            width: 200,
            type: "slot",
            align: "center",
            slotName: "operation",
            fixed: "right",
        },
    ],
    checkbox: true,
})
const requestConfig = ref({
    form: {
        id: "",
        title: "",
    },
});
const table_data = ref([]);
const isShow = ref(true);


const page = reactive({ current: 1, size: 8 });
const total = ref(16);
//删除一条
const handleDelete = (id) => {
    console.log("删除", id);
    doDeleteRequest(constant.appointment.deleteUrl, id).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
            ElMessage({
                message: "删除成功",
                type: "success"
            });
            refreshTable();
        }
    });
};
//批量删除
const delIds = delBatchStore.state.delIds//获取存储在store中的id
const delBatch = () => {
    console.log("批量删除");
    if (delIds.length == 0) {
        ElMessage({
            message: "请至少选择一条数据",
            type: "warning",
        });
    } else {
        doPostRequest(constant.appointment.deleteBatchUrl, delIds).then(
            (res) => {
                console.log(res);
                if (res.data.code === 200) {
                    ElMessage({
                        message: "批量删除成功",
                        type: "success",
                    });
                }
            }
        );
        refreshTable();
        delBatchStore.clearIds();
    }
};


const searchData = () => {
    console.log("查询");
    let isInput = false;
    const page_parm = { current: 1, size: page.size };
    const data_param = requestConfig.value.form;
    Object.keys(data_param).forEach((v) => {
        if (data_param[v] != null && data_param[v] !== "") { // 修正条件判断
            isInput = true;
        }
    });

    if (isInput) {
        searchOrGetRequest(
            constant.appointment.searchOrGetPageList,
            page_parm,
            data_param
        ).then((res) => {
            if (res.data.code === 200) {
                let records = res.data.data.records;
                if (records.length === 0) {
                    ElMessage({
                        message: "没有符合条件的数据",
                        duration: 1600,
                        type: "error",
                    });
                }
                table_data.value = res.data.data.records;
                total.value = res.data.data.total;
            } else if (res.data.code === 400) {
                ElMessage({
                    message: res.data.data.msg,
                    type: "warning",
                    duration: 1600,
                });
            } else {
                ElMessage({
                    message: "请求失败了,请检查网络或者服务器",
                    duration: 1600,
                    type: "error",
                });
            }
        });
    } else {
        ElMessage({ // 使用 ElMessage 替换
            message: "亲,你还没有输入任何搜索条件",
            duration: 1600,
            type: "warning",
        });
    }
};
//清空查询框
const resetSerach = () => {
    let obj = requestConfig.value.form;
    Object.keys(obj).forEach((key) => {
        obj[key] = "";
    });
}
const refreshTable = () => {
    //清空查询框
    resetSerach();
    //重新获取数据加载
    getTableData();
};



//下一页
const handlePageChange = (newPage) => {
    page.current = newPage;

    const page_parm = { current: newPage, size: page.size };
    const data_param = requestConfig.value.form;

    searchOrGetRequest(
        constant.appointment.searchOrGetPageList,
        page_parm,
        data_param
    ).then((res) => {
        if (res.data.code === 200) {
            table_data.value = res.data.data.records;
            total.value = res.data.data.total;
        } else {
            ElMessage({
                message: "请求失败了,请检查网络或者服务器",
                duration: 1600,
                type: "error",
            });
        }
    });
    console.log("点击哪一页了: " + page.current);
};
//每次几条
const handleSizeChange = (newSize) => {
    page.size = newSize;
    getTableData();
    console.log("每次几条: " + page.size);
};

//获取表格数据
const getTableData = async () => {
    const res = await searchOrGetRequest(
        constant.appointment.searchOrGetPageList,
        page,
        null
    );
    console.log(res.data.code);
    if (res.data.code === 200) {
        console.log(res.data.data.records);
        table_data.value = res.data.data.records;
        console.log(res.data.data)
        total.value = res.data.data.total;
    } else {
        ElMessage({
            message: "请求失败了,请检查网络或者服务器",
            duration: 1600,
            type: "error",
        });
    }
};
//setup包含了生命周期函数
getTableData();

</script>

<style lang='less' scoped>
.emo-form-inline {
    display: flex;
}

.pull-right {
    float: right;
}

.el-card {
    --el-card-padding: 15px;
}



.pagination-container {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    // margin-top: 20px;
}

:deep(.el-dialog) {
    text-align: left !important;
    width: 800px;
    height: 600px;
}
</style>