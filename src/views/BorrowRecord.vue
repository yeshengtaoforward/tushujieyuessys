<script setup lang="ts">
// 借阅记录页面：静态文本数据展示
const records = [
  { id: 1, book: 'Vue.js 实战', reader: '张三', borrowDate: '2026-10-01', dueDate: '2026-10-15' },
  { id: 2, book: 'JavaScript 高级程序设计', reader: '李四', borrowDate: '2026-10-05', dueDate: '2026-10-19' },
  { id: 3, book: '深入理解 TypeScript', reader: '王五', borrowDate: '2026-10-12', dueDate: '2026-10-26' },
]
</script>

<template>
  <div class="borrow-record">
    <div class="page-title">
      <h2>借阅记录</h2>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>书名</th>
              <th>借阅人</th>
              <th>借出日期</th>
              <th>应还日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td>{{ record.id }}</td>
              <td>{{ record.book }}</td>
              <td>{{ record.reader }}</td>
              <td>{{ record.borrowDate }}</td>
              <td>{{ record.dueDate }}</td>
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
  .page-title h2 {
    font-size: 18px;
  }
}
</style>