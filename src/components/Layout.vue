<script setup lang="ts">
// 父布局组件：侧边菜单 + 内容区（响应式）
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const menuOpen = ref(false) // 手机端菜单开关

// 退出登录：调用 store 清空状态后跳回登录页
function logout() {
  userStore.logout()
  router.push('/login')
}

// 点击子菜单后，在手机端收起菜单
function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="layout">
    <!-- 顶部栏（手机端才显示） -->
    <header class="topbar">
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        ☰
      </button>
      <h2 class="title">📚 图书系统</h2>
    </header>

    <!-- 侧边菜单 -->
    <aside class="sidebar" :class="{ open: menuOpen }">
      <h2 class="title title-desktop">📚 图书系统</h2>
      <div class="user-info">👤 {{ userStore.username }}</div>
      <nav>
        <RouterLink to="/books" @click="closeMenu">图书列表</RouterLink>
        <RouterLink to="/borrow" @click="closeMenu">借阅记录</RouterLink>
      </nav>
      <button class="logout" @click="logout">退出登录</button>
    </aside>

    <!-- 主区域：渲染嵌套子路由 -->
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

/* 顶部栏：默认隐藏，手机端显示 */
.topbar {
  display: none;
}

/* ===== 侧边栏（电脑端：固定左侧） ===== */
.sidebar {
  width: 220px;
  padding: 24px;
  background: linear-gradient(180deg, #2c3e50, #243342);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
}

.title {
  margin: 0;
  font-size: 18px;
  letter-spacing: 1px;
}

.user-info {
  padding: 10px 14px;
  margin-top: -12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar nav a {
  color: #cfd8dc;
  text-decoration: none;
  padding: 12px 14px;
  border-radius: 8px;
  transition: all 0.2s;
}

.sidebar nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar nav a.router-link-active {
  background: #42b983;
  color: #fff;
  box-shadow: 0 2px 6px rgba(66, 185, 131, 0.4);
}

.logout {
  margin-top: auto;
  padding: 12px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.logout:hover {
  background: #c0392b;
}

/* ===== 内容区 ===== */
.content {
  flex: 1;
  padding: 32px;
}

/* ===== 响应式：手机端（≤768px） ===== */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  /* 顶部栏 */
  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #2c3e50;
    color: #fff;
  }

  .menu-toggle {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  /* 桌面标题隐藏，用顶部栏标题 */
  .title-desktop {
    display: none;
  }

  /* 侧边栏变成下拉抽屉 */
  .sidebar {
    width: 100%;
    padding: 0;
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .sidebar.open {
    max-height: 300px;
  }

  .sidebar nav {
    flex-direction: column;
    padding: 8px 16px;
  }

  .sidebar nav a {
    padding: 12px;
  }

  .sidebar .logout {
    border-radius: 0;
    margin-top: 0;
  }

  .content {
    padding: 16px;
  }
}
</style>