<!--
 * @Author: 刘洋
 * @Date: 2024-11-25 15:36:31
 * @LastEditTime: 2025-02-22 22:29:41
 * @Description: 
-->
<template>
    <div class="home-container">
        <h1 class="title">欢迎来到智慧医疗后台管理系统</h1>
        <el-card class="info-card" shadow="always">
            <h2>系统概览</h2>
            <p>在这里，您可以管理病人信息、查看病例记录、进行数据分析等。</p>
        </el-card>
        <el-row class="stats-row" :gutter="20">
            <el-col :span="8">
                <el-card class="stat-card" shadow="hover">
                    <h3>总病人数量</h3>
                    <p class="stat-number">1200</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="stat-card" shadow="hover">
                    <h3>今日新增病人</h3>
                    <p class="stat-number">15</p>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="stat-card" shadow="hover">
                    <h3>待处理病例</h3>
                    <p class="stat-number">5</p>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="info-card" shadow="always" style="margin-top: 20px;">
            <h2>最新动态</h2>
            <ul class="news-list">
                <li>新增病人记录：张三，病历编号：12345</li>
                <li>病例审核通过：李四，病历编号：67890</li>
                <li>系统维护通知：将于本周五进行系统维护，请提前做好准备。</li>
            </ul>
        </el-card>
        <el-card class="author-card" shadow="always" style="margin-top: 20px;">
            <h2>作者信息</h2>
            <div class="author-info">
                <p><strong>作者:</strong> 刘洋</p>
                <p><strong>联系方式:</strong> <a href="mailto:2965184610@qq.com">2965184610@qq.com</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/doc_sys" target="_blank">doc_sys</a></p>
            </div>
        </el-card>
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.home-container {
    padding: 40px; /* 增加内边距 */
    text-align: center;
    background-color: #f0f2f5; /* 背景色 */
    min-height: 100vh; /* 确保至少占满整个视口高度 */
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: #333; /* 标题颜色 */
    margin-bottom: 20px; /* 标题下方间距 */
}

.info-card {
    margin-bottom: 30px; /* 增加底部间距 */
    background-color: #ffffff; /* 卡片背景色 */
    border-radius: 10px; /* 圆角 */
    padding: 20px; /* 内边距 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.stats-row {
    margin-top: 20px;
}

.stat-card {
    text-align: center;
    padding: 30px; /* 增加内边距 */
    background-color: #ffffff; /* 卡片背景色 */
    border-radius: 10px; /* 圆角 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    transition: transform 0.3s; /* 动画效果 */
}

.stat-card:hover {
    transform: translateY(-5px); /* 悬停时上移 */
}

.stat-number {
    font-size: 36px; /* 增加数字字体大小 */
    font-weight: bold;
    color: #409EFF; /* Element Plus 的主色调 */
}

.news-list {
    list-style-type: none; /* 去掉默认的列表样式 */
    padding: 0; /* 去掉内边距 */
    text-align: left; /* 左对齐 */
}

.news-list li {
    margin: 10px 0; /* 列表项之间的间距 */
}

.author-card {
    margin-top: 20px; /* 添加顶部间距 */
    background-color: #ffffff; /* 卡片背景色 */
    border-radius: 10px; /* 圆角 */
    padding: 20px; /* 内边距 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.author-info {
    font-size: 14px; /* 字体大小 */
    color: #333; /* 字体颜色 */
    text-align: left; /* 左对齐 */
    line-height: 1.6; /* 行高，增加可读性 */
}
</style>