import { createRouter, createWebHistory } from 'vue-router'
import Records from '@/page/Records.vue'
import Login from '@/page/login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'records', component: Records },
    { path: '/login', name: 'login', component: Login }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router