import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

/** 从环境变量读取应用标题，用于 document.title 的默认值 */
const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue Starter'

/**
 * 路由表
 * - 新增页面：在此添加路由项，component 指向 src/views/ 下的组件
 * - meta.title：切换路由时自动更新浏览器标题
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: appTitle },
  },
  // 未匹配路径统一重定向到首页（生产环境 SPA 回退由托管平台处理）
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  // BASE_URL 由 VITE_BASE 决定，GitHub Pages 子路径部署时必须正确设置
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

/** 路由切换前更新页面标题 */
router.beforeEach((to, _from, next) => {
  const pageTitle = (to.meta?.['title'] as string) || appTitle
  document.title = pageTitle
  next()
})

export default router
