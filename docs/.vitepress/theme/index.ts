import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ApiCodePanel from './components/ApiCodePanel.vue'
import ApiEndpoint from './components/ApiEndpoint.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiCodePanel', ApiCodePanel)
    app.component('ApiEndpoint', ApiEndpoint)
  }
} satisfies Theme
