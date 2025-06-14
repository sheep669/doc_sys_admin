/*
 * @Author: 刘洋
 * @Date: 2024-11-21 15:16:59
 * @LastEditTime: 2025-02-22 10:42:30
 * @Description: 主入口文件
 */
import { createApp } from 'vue'
import App from './App.vue'
//引入路由
import router from './router/index'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/less/index.less"
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App)
//使用element图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//引入pinia状态管理器
import { createPinia } from 'pinia';
const pinia = createPinia();

// 使用 Element Plus 并设置语言为中文
app.use(ElementPlus, { locale: zhCn })

app.use(pinia);
app.use(router)

app.mount('#app')





