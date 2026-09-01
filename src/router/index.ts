import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const appTitle = import.meta.env.VITE_APP_TITLE || 'Vue Starter'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: appTitle },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, _from, next) => {
  const pageTitle = (to.meta?.['title'] as string) || appTitle
  document.title = pageTitle
  next()
})

export default router
