<script setup lang="ts">
// 图书列表页面：接口加载数据 + 新增/编辑/删除
import { onMounted, reactive, ref } from 'vue'
import { getBooks, addBook, updateBook, deleteBook } from '@/api/book'

const books = ref([])
const loading = ref(false)

// 弹窗开关
const dialogVisible = ref(false)
// 编辑中的图书 id（空表示新增）
const editingId = ref(null)
// 表单数据
const form = reactive({ title: '', author: '', year: null })

// 页面加载时拉取图书列表
async function loadBooks() {
  loading.value = true
  try {
    // 拦截器返回 data（{ list, total }）
    const data = await getBooks(1, 10)
    books.value = data.list
  } finally {
    loading.value = false
  }
}

// 打开新增弹窗
function openAdd() {
  editingId.value = null
  Object.assign(form, { title: '', author: '', year: null })
  dialogVisible.value = true
}

// 打开编辑弹窗：回填当前行数据
function openEdit(book) {
  editingId.value = book.id
  Object.assign(form, { title: book.title, author: book.author, year: book.year })
  dialogVisible.value = true
}

// 提交：新增或编辑，成功后刷新列表
async function submit() {
  if (editingId.value) {
    await updateBook(editingId.value, { ...form })
  } else {
    await addBook({ ...form })
  }
  dialogVisible.value = false
  loadBooks()
}

// 删除：调用接口成功后刷新列表
async function handleDelete(book) {
  await deleteBook(book.id)
  loadBooks()
}

onMounted(loadBooks)
</script>

<template>
  <div class="book-list">
    <div class="page-title">
      <h2>图书列表</h2>
      <button class="btn primary" @click="openAdd">新增图书</button>
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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="empty-tip">加载中...</td>
            </tr>
            <tr v-else-if="!books.length">
              <td colspan="5" class="empty-tip">暂无数据</td>
            </tr>
            <tr v-else v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>
                <button class="btn" @click="openEdit(book)">编辑</button>
                <button class="btn danger" @click="handleDelete(book)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 新增 / 编辑弹窗 -->
    <div v-if="dialogVisible" class="modal-mask" @click.self="dialogVisible = false">
      <div class="modal">
        <h3>{{ editingId ? '编辑图书' : '新增图书' }}</h3>
        <label>书名
          <input v-model="form.title" type="text" />
        </label>
        <label>作者
          <input v-model="form.author" type="text" />
        </label>
        <label>出版年份
          <input v-model.number="form.year" type="number" />
        </label>
        <div class="modal-actions">
          <button class="btn" @click="dialogVisible = false">取消</button>
          <button class="btn primary" @click="submit">保存</button>
        </div>
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

/* 加载中 / 空数据的提示行 */
.empty-tip {
  text-align: center;
  color: #999;
  padding: 32px 14px;
}

/* 通用按钮 */
.btn {
  padding: 6px 12px;
  margin-right: 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
}

.btn.primary {
  background: #42b983;
  color: #fff;
  border-color: #42b983;
}

.btn.danger {
  color: #e74c3c;
  border-color: #e74c3c;
}

/* 弹窗遮罩与内容 */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin: 0 0 20px;
  color: #333;
}

.modal label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
}

.modal input {
  width: 100%;
  box-sizing: border-box;
  margin-top: 6px;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
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