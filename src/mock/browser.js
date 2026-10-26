import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建浏览器端 MSW worker，用于拦截并模拟接口请求
export const worker = setupWorker(...handlers)