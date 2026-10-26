import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 创建 Pinia 实例并注册持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// 暂时关闭 MSW mock（如需恢复，将下方开关改回 true 即可）
const USE_MOCK = true

async function enableMocking() {
  if (USE_MOCK && import.meta.env.DEV) {
    const { worker } = await import('./mock/browser')
    await worker.start()
  }
}

enableMocking().then(() => {
  app.mount('#app')
})