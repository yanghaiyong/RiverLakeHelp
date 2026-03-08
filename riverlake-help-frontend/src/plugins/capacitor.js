import { App } from '@capacitor/app'
import { Haptics } from '@capacitor/haptics'
import { Keyboard } from '@capacitor/keyboard'
import { StatusBar } from '@capacitor/status-bar'

/**
 * 初始化 Capacitor 插件
 */
export function initCapacitorPlugins() {
  // 监听 App 事件
  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active:', isActive)
  })

  // 监听返回按钮
  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp()
    } else {
      window.history.back()
    }
  })

  // 设置状态栏样式
  if (StatusBar.setStyle) {
    StatusBar.setStyle({ style: 'DARK' })
  }

  console.log('Capacitor plugins initialized')
}

/**
 * 触觉反馈
 */
export async function triggerHapticFeedback() {
  if (Haptics && Haptics.impact) {
    await Haptics.impact({ style: 'medium' })
  }
}

export { App, Haptics, Keyboard, StatusBar }
