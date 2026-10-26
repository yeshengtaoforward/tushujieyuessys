import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'

// 创建 axios 实例：统一 baseURL 与超时时间
const request = axios.create({
  baseURL: '/api', // 开发环境由 MSW 拦截，生产可改为真实后端地址
  timeout: 10000, // 10s 超时
})

// 请求拦截器：从 user store 读取 token，放入 Authorization 头
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

// 响应拦截器：统一处理业务状态码
request.interceptors.response.use(
  (response) => {
    const res = response.data
    // 业务 code 为 200 时直接返回 data，供调用方取用
    if (res.code === 200) {
      return res.data
    }
    // 401：清空登录态并跳转登录页
    if (res.code === 401) {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/login')
    }
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  (error) => {
    // 500 等网络/服务端错误提示
    console.error('服务器错误：', error.response?.data?.message || error.message)
    return Promise.reject(error)
  },
)

export default request