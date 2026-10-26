import request from '@/utils/request'

// 登录：使用用户名
export function login(username) {
  return request.post('/login', { username })
}