# tushujieyuesys

图书借阅系统（前端 Demo），基于 **Vue 3 + TypeScript + Vite + Pinia + Vue Router**。

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Vue Router 4（Web History 模式 + 前置路由守卫登录鉴权）
- Pinia（全局状态管理）—— 集成 `pinia-plugin-persistedstate` 持久化
- Vite 8 + vue-tsc 类型检查
- TypeScript

## 功能

- 登录页：输入用户名模拟登录，写入用户状态（token、姓名、角色）
- 图书列表：展示静态图书数据（编号 / 书名 / 作者 / 出版年份）
- 借阅记录：展示静态借阅数据（编号 / 书名 / 借阅人 / 借出日期 / 应还日期）
- 布局：桌面端侧边栏 + 响应式手机端抽屉菜单
- 路由守卫：未登录访问受保护页面重定向到登录页
- **状态持久化**：通过 pinia 插件将用户登录态自动持久化，刷新页面后保持登录

## 目录结构

```
src/
├── main.ts              # 应用入口（注册 Pinia + 持久化插件 + 路由）
├── App.vue              # 根组件
├── router/index.ts      # 路由配置 + 登录鉴权守卫
├── stores/user.js       # 用户状态 store（token / userInfo / 登录动作）
├── components/Layout.vue# 主布局（侧边栏 + 内容区）
└── views/
    ├── Login.vue        # 登录页（用户名输入 + 模拟登录）
    ├── BookList.vue     # 图书列表
    └── BorrowRecord.vue # 借阅记录
```

## 状态管理说明

- user store 已开启 `persist: true`，状态变化后自动写入 `localStorage`（key 为 store id `user`），应用刷新后自动恢复登录态。
- 登录 / 退出统一走 store 的 `login()` / `logout()`，各页面无需再直接操作 `localStorage`。

## 运行

```sh
npm install
npm run dev        # 开发调试（热更新）
npm run build      # 类型检查 + 生产构建
npm run type-check # 仅类型检查（vue-tsc）
```