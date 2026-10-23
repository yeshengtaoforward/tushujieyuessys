import { defineStore } from 'pinia'

// 用户状态 store（persist 开启后自动持久化到 localStorage，刷新保持登录态）
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {
      name: '',
      role: '',
    },
  }),
  getters: {
    // 是否已登录：token 存在即为登录态
    isLoggedIn: (state) => !!state.token,
    // 当前登录用户名
    username: (state) => state.userInfo.name,
  },
  actions: {
    // 模拟登录：保存 token 与用户信息
    login(username) {
      this.token = 'mock-token-' + Date.now()
      this.userInfo = { name: username, role: 'reader' }
    },
    // 退出登录：清空状态
    logout() {
      this.token = ''
      this.userInfo = { name: '', role: '' }
    },
  },
  // 持久化：状态变化后自动写入 localStorage（默认 key 为 store id）
  persist: true,
})