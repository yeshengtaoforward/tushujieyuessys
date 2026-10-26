import { http, HttpResponse } from 'msw'

// 内存中的用户与图书数据（模拟数据库）
let userInfo = { name: '张三', role: 'admin' }
let books = [
  { id: 1, title: 'Vue.js 实战', author: '尤雨溪', year: 2020 },
  { id: 2, title: 'JavaScript 高级程序设计', author: 'Nicholas', year: 2019 },
  { id: 3, title: 'CSS 权威指南', author: 'Eric Meyer', year: 2021 },
  { id: 4, title: '深入理解 TypeScript', author: 'Basarat All', year: 2022 },
]
let idSeq = books.length // 自增 id 起点

// 1) 登录：返回 token 与用户信息
export const loginHandler = http.post('/api/login', async ({ request }) => {
  const body = await request.json()
  userInfo = { name: body.username || '张三', role: 'reader' }
  return HttpResponse.json({
    code: 200,
    data: { token: 'mock-token-' + Date.now(), userInfo },
  })
})

// 2) 查询图书列表（支持分页）
export const bookListHandler = http.get('/api/books', ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') || 1)
  const pageSize = Number(url.searchParams.get('pageSize') || 10)

  // 6) 指定 page=0 模拟空数据
  if (page === 0) {
    return HttpResponse.json({ code: 200, data: { list: [], total: 0 } })
  }

  const start = (page - 1) * pageSize
  const list = books.slice(start, start + pageSize)
  return HttpResponse.json({ code: 200, data: { list, total: books.length } })
})

// 3) 新增图书
export const bookCreateHandler = http.post('/api/books', async ({ request }) => {
  const body = await request.json()
  const newBook = { id: ++idSeq, title: body.title, author: body.author, year: body.year }
  books.push(newBook)
  return HttpResponse.json({ code: 200, data: newBook })
})

// 4) 编辑图书（按 id 更新）
export const bookUpdateHandler = http.put('/api/books/:id', async ({ request, params }) => {
  const id = Number(params.id)
  const body = await request.json()
  books = books.map((b) => (b.id === id ? { ...b, ...body, id } : b))
  return HttpResponse.json({ code: 200, data: books.find((b) => b.id === id) })
})

// 5) 删除图书
export const bookDeleteHandler = http.delete('/api/books/:id', ({ params }) => {
  const id = Number(params.id)
  books = books.filter((b) => b.id !== id)
  return HttpResponse.json({ code: 200, data: { id } })
})

// 6) 返回 HTTP 500 的演示接口：触发响应拦截器的 error 分支
export const serverErrorHandler = http.get('/api/error', () => {
  return new HttpResponse(null, { status: 500 })
})

// 7) 需 Authorization 否则返回 401 的演示接口：缺头时清登录态跳转
export const authRequiredHandler = http.get('/api/protected', ({ request }) => {
  const token = request.headers.get('Authorization')
  if (!token) {
    return new HttpResponse(null, { status: 401 })
  }
  return HttpResponse.json({ code: 200, data: { ok: true } })
})

// 统一导出所有 handler，供浏览器/Node 环境初始化
export const handlers = [
  loginHandler,
  bookListHandler,
  bookCreateHandler,
  bookUpdateHandler,
  bookDeleteHandler,
  serverErrorHandler,
  authRequiredHandler,
]