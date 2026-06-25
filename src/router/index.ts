import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Records from '@/page/Records.vue'  
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'

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
  const token = localStorage.getItem('token')
  const isAuthPage = to.path.startsWith('/auth/')
  if (!token && !isAuthPage) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router