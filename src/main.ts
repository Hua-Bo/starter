/**
 * 应用入口
 * 负责创建 Vue 实例、注册插件（Pinia / Router）并挂载到 DOM
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/index.scss'

const app = createApp(App)

// 全局状态管理
app.use(createPinia())
// 客户端路由
app.use(router)

app.mount('#app')
