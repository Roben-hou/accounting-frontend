import axios from 'axios'
import { userAuthStore } from '@/stores/auth'
import router from '@/router'

const request = axios.create({
   baseURL: 'https://nodejs-production-acc0.up.railway.app',
  timeout: 5000,
})

request.interceptors.request.use(config => {
  const authStore = userAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

request.interceptors.response.use(response => {
  const { data } = response
  if (data.code == 200) {
    return data.data
  }
  return Promise.reject(new Error(data.message))
}, error => {
  if (error.response?.status === 401) {
    const authStore = userAuthStore()
    authStore.clearToken()
    router.push('/auth/login')
  }
  return Promise.reject(error)
})
  

export default request