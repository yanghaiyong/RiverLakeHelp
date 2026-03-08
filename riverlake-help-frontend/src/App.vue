<template>
  <div class="app">
    <header class="header">
      <h1>RiverLake Help</h1>
      <p class="subtitle">Spring Boot + Vue 3 + Capacitor</p>
    </header>
    
    <main class="content">
      <div class="card">
        <h2>欢迎使用 RiverLake Help</h2>
        <p>这是一个基于 Spring Boot、Vue 3 和 Capacitor 构建的跨平台应用。</p>
        <button @click="testApi" :disabled="loading">
          {{ loading ? '加载中...' : '测试 API' }}
        </button>
      </div>
      
      <div v-if="apiResult" class="result">
        <h3>API 响应：</h3>
        <pre>{{ apiResult }}</pre>
      </div>
      
      <div v-if="error" class="error">
        <h3>错误：</h3>
        <pre>{{ error }}</pre>
      </div>
    </main>
    
    <footer class="footer">
      <p>Platform: {{ platform }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Capacitor } from '@capacitor/core'

const loading = ref(false)
const apiResult = ref(null)
const error = ref(null)
const platform = ref('')

onMounted(() => {
  platform.value = Capacitor.getPlatform()
  console.log('Current platform:', platform.value)
})

const testApi = async () => {
  loading.value = true
  error.value = null
  apiResult.value = null
  
  try {
    // 使用原生 fetch 或通过 Vite 代理
    const response = await fetch('/api/hello')
    const data = await response.json()
    apiResult.value = JSON.stringify(data, null, 2)
  } catch (err) {
    error.value = err.message
    console.error('API test failed:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.app {
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 20px;
  text-align: center;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.content {
  padding: 30px 20px;
}

.card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.card h2 {
  color: #333;
  margin-bottom: 12px;
  font-size: 20px;
}

.card p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result, .error {
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
}

.result {
  background: #d4edda;
  border: 1px solid #c3e6cb;
}

.result h3 {
  color: #155724;
  margin-bottom: 8px;
}

.error {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
}

.error h3 {
  color: #721c24;
  margin-bottom: 8px;
}

pre {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.footer {
  background: #f8f9fa;
  padding: 16px 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>
