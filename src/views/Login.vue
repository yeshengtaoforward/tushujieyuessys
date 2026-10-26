<script setup lang="ts">
// 登录页面
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login as loginApi } from '@/api/auth'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const loading = ref(false)

// 点击登录：调用登录接口，成功后写入 store 并跳转
async function handleLogin() {
  if (!username.value || loading.value) return
  loading.value = true
  try {
    // 拦截器已在 code===200 时返回 data（含 token/userInfo）
    const data = await loginApi(username.value)
    userStore.token = data.token
    userStore.userInfo = data.userInfo
    router.push('/books')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="card">
      <h2>图书系统登录</h2>
      <p class="sub">欢迎回来，请登录账号</p>
      <input
        v-model="username"
        class="username-input"
        type="text"
        placeholder="请输入用户名"
        @keyup.enter="handleLogin"
      />
      <button class="login-btn" :disabled="loading" @click="handleLogin">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(135deg, #2c3e50, #42b983);
}

.card {
  width: 100%;
  max-width: 360px;
  padding: 40px 32px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  margin: 0;
  color: #333;
}

.sub {
  margin: 8px 0 28px;
  color: #999;
  font-size: 14px;
}

.username-input {
  width: calc(100% - 24px);
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.username-input:focus {
  border-color: #42b983;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #359a6b;
}

@media (max-width: 768px) {
  .card {
    padding: 32px 24px;
  }
}
</style>