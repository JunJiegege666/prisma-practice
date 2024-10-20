import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/LayoutView/LayoutView.vue'),
    },
    {
        path: '/login',
        component: () => import('@/views/LoginView/LoginView.vue'),
    },
    {
        path: '/register',
        component: () => import('@/views/RegisterView/RegisterView.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),  // 使用 Web 历史模式
    routes,
})

export default router
