import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 静态路由表：登录页 + 父布局(嵌套子路由)
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    // 路由懒加载：只有访问到时才加载对应组件
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/components/Layout.vue'),
    // meta.requiresAuth 标记：需要登录才能访问
    meta: { requiresAuth: true },
    // 嵌套路由：以 Layout 为父布局，子页面渲染到 Layout 的 <RouterView>
    children: [
      {
        path: '',
        redirect: '/books',
      },
      {
        path: 'books',
        name: 'BookList',
        component: () => import('@/views/BookList.vue'),
      },
      {
        path: 'borrow',
        name: 'BorrowRecord',
        component: () => import('@/views/BorrowRecord.vue'),
      },
    ],
  },
  // 404 兜底：匹配所有未定义路径，重定向到登录页
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换路由时回到页面顶部
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// 全局前置守卫：做登录鉴权
router.beforeEach((to) => {
  const token = localStorage.getItem('library_token')

  // 页面标记了 requiresAuth 且没有 token → 跳到登录页
  if (to.meta.requiresAuth && !token) {
    return { path: '/login' }
  }
  // 已登录用户访问登录页 → 跳到首页
  if (to.path === '/login' && token) {
    return { path: '/books' }
  }
  return true
})

export default router