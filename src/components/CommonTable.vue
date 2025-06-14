<template>
    <div class="CommonTable">
        <el-table v-if="isShow" :data="tableData" style="width: 100%" border max-width="250" height="520"
            empty-text="暂无数据" @selection-change="handleSelectionChange">
            <!-- 表头checkbox选框默认设置 -->
            <el-table-column v-if="table_config.checkbox" type="selection" width="55" fixed>
            </el-table-column>
            <template v-for="item in table_config.thead" :key="item.prop">
                <!-- 插槽类型 slot  -->
                <el-table-column v-if="item.type === 'slot'" :align="item.align" :fixed="item.fixed" :label="item.label"
                    :prop="item.prop" :width="item.width">
                    <template #default="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <!-- 功能型默认 function  -->
                <el-table-column v-else-if="item.type === 'function'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-tag>
                            {{
                                item.callback &&
                                item.callback(scope.row, item.prop)
                            }}</el-tag>
                    </template>
                </el-table-column>
                <!-- tag型  -->
                <el-table-column v-else-if="item.type === 'tag'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row[item.prop] }}</el-tag>
                    </template>
                </el-table-column> 
                <!-- dangerTag型  -->
                <el-table-column v-else-if="item.type === 'dangerTag'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-tag type="danger">{{ scope.row[item.prop] }}</el-tag>
                    </template>
                </el-table-column>  
                <!-- 对错tag  -->
                <el-table-column v-else-if="item.type === 'TFTag'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row[item.prop]==='是'">{{ scope.row[item.prop] }}</el-tag>
                        <el-tag type="danger" v-if="scope.row[item.prop]==='否'">{{ scope.row[item.prop] }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 功能型 aduit  -->
                <el-table-column v-else-if="item.type === 'aduit'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-tag v-if="scope.row.auditStatus === '1'" type="info">
                            {{ "item.callback && item.callback(scope.row)" }}</el-tag>
                        <el-tag v-if="scope.row.auditStatus === '2'" type="warning">
                            {{ "item.callback && item.callback(scope.row)" }}</el-tag>
                        <el-tag v-if="scope.row.auditStatus === '3'" type="success">
                            {{ "item.callback && item.callback(scope.row)" }}</el-tag>
                        <el-tag v-if="scope.row.auditStatus === '4'" type="danger">
                            {{ "item.callback && item.callback(scope.row)" }}</el-tag>
                    </template>
                </el-table-column>
                <!-- 数据类型 image  -->
                <el-table-column v-else-if="item.type === 'image'" :label="item.label" :prop="item.prop"
                    :width="item.width">
                    <template #default="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.avatar" :fit="fit"></el-image>
                    </template>
                </el-table-column>
                <!-- 普通类型 -->
                <el-table-column v-else :label="item.label" :prop="item.prop" :width="item.width" :fixed="item.fixed"
                    show-overflow-tooltip></el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useDelBatchStore } from '@/stores/delBatchStore'; // 引入 Pinia Store
const delBatchStore = useDelBatchStore(); // 使用 Pinia Store
export default {
    name: "CommonTable",
    setup(props) {
        const table_config = reactive({
            thead: [],
            checkbox: "",
        });

        const tableData = ref([]);
        const isShow = ref(true);
        const fit = ref('cover');

        const handleSelectionChange = (selectedRows) => {
            console.log("复选框", selectedRows);
            // 清空 delIds
            delBatchStore.clearIds(); // 清空之前的 ID
            // 更新 delIds
            const ids = [];
            selectedRows.forEach((item) => {
                ids.push(item.id);
            });
            delBatchStore.addIds(ids); // 添加到 store 中
        };

        const initConfig = () => {
            for (let key in props.config) {
                if (Object.keys(table_config).includes(key)) {
                    table_config[key] = props.config[key];
                }
            }
        };

        watch(() => props.config, () => {
            initConfig();
        }, { immediate: true });

        return {
            table_config,
            tableData,
            isShow,
            fit,
            handleSelectionChange,
        };
    },
    props: {
        config: {
            type: Object,
            default: () => ({}),
        },
        tableData: {
            type: Array,
            default: () => [],
        },
        isShow: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="less" scoped>
.el-table tr:hover {
    background-color: #f0f0f0;
    /* 悬停效果 */
}

.el-table__empty-text {
    text-align: center;
    /* 空数据时居中显示 */
    color: #999;
    /* 空数据字体颜色 */
}
</style>
