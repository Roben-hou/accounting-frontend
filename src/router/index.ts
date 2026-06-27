import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Records from '@/page/Records.vue'  
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'
import { userAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/auth/login', name: 'login', component: Login },
    { path: '/auth/register', name: 'register', component: Register },
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'records', component: Records },
        { path: 'records', component: Records }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = userAuthStore()
  const isAuthPage = to.path.startsWith('/auth/')
  if (!authStore.isLogin && !isAuthPage) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router