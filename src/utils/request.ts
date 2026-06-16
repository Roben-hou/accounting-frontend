import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
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