import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Records from '@/page/Records.vue'  
import Family from '@/page/family.vue'  
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'
import Invitation from '@/page/invitation.vue'
import InvitationHistory from '@/page/invitationHistory.vue'
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
        { path: 'records', component: Records },
        { path: 'family', component: Family },
        { path: 'invitation', component: Invitation },
        { path: 'invitationhistory', component: InvitationHistory }
      ]
    },
    {
  path: '/family/:id',
  component: () => import('@/page/familyDetail.vue')
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
