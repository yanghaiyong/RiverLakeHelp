import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

// 初始化 Capacitor
import { Capacitor } from '@capacitor/core'

const app = createApp(App)

// 注册插件
registerPlugins(app)

// 开发环境启用控制台日志
if (import.meta.env.DEV) {
  console.log('Running in development mode')
  console.log('Capacitor platform:', Capacitor.getPlatform())
}

app.mount('#app')
