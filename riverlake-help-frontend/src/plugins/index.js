import axios from 'axios'

/**
 * 注册 Vue 插件
 */
export function registerPlugins(app) {
  // 配置 axios
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // 请求拦截器
  api.interceptors.request.use(
    config => {
      console.log('[API Request]', config.method?.toUpperCase(), config.url)
      return config
    },
    error => {
      console.error('[API Request Error]', error)
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  api.interceptors.response.use(
    response => {
      console.log('[API Response]', response.config.url, response.status)
      return response
    },
    error => {
      console.error('[API Response Error]', error)
      return Promise.reject(error)
    }
  )

  // 全局挂载
  app.config.globalProperties.$http = api
  app.provide('http', api)
}
