import axios from 'axios'

const request = axios.create({
   baseURL: 'https://nodejs-production-acc0.up.railway.app',
  timeout: 5000,
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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
  return Promise.reject(error)
})

export default request