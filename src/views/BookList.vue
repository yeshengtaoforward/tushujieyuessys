<script setup lang="ts">
// 图书列表页面：静态文本数据展示
import { useRouter } from 'vue-router'

const router = useRouter()

// 退出登录：删除 token 并跳转登录页
function logout() {
  localStorage.removeItem('library_token')
  router.push('/login')
}

const books = [
  { id: 1, title: 'Vue.js 实战', author: '尤雨溪', year: 2020 },
  { id: 2, title: 'JavaScript 高级程序设计', author: 'Nicholas', year: 2019 },
  { id: 3, title: 'CSS 权威指南', author: 'Eric Meyer', year: 2021 },
  { id: 4, title: '深入理解 TypeScript', author: 'Basarat All', year: 2022 },
]
</script>

<template>
  <div class="book-list">
    <div class="page-title">
      <h2>图书列表</h2>
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>书名</th>
              <th>作者</th>
              <th>出版年份</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.page-title h2 {
  margin: 0;
  color: #333;
}

.logout-btn {
  padding: 10px 20px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #c0392b;
}

.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 12px;
  overflow: hidden;
}

/* 表格外层容器：内容过多时可横向滚动，手机端友好 */
.table-wrap {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
}

th {
  background: #f7f8fa;
  color: #555;
  font-weight: 600;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f0fbf5;
}

@media (max-width: 768px) {
  .content-pad {
    padding: 12px;
  }

  .page-title h2 {
    font-size: 18px;
  }
}
</style>