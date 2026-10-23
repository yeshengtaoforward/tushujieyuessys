<script setup lang="ts">
// 登录页面
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟登录：写入 token 后跳转图书列表
function handleLogin() {
  localStorage.setItem('library_token', 'mock-token-' + Date.now())
  router.push('/books')
}
</script>

<template>
  <div class="login-page">
    <div class="card">
      <h2>图书系统登录</h2>
      <p class="sub">欢迎回来，请登录账号</p>
      <button class="login-btn" @click="handleLogin">模拟登录</button>
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