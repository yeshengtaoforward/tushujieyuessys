import request from '@/utils/request'

// 分页查询图书列表
export function getBooks(page = 1, pageSize = 10) {
  return request.get('/books', { params: { page, pageSize } })
}

// 新增图书
export function addBook(data) {
  return request.post('/books', data)
}

// 编辑图书（按 id）
export function updateBook(id, data) {
  return request.put(`/books/${id}`, data)
}

// 删除图书（按 id）
export function deleteBook(id) {
  return request.delete(`/books/${id}`)
}