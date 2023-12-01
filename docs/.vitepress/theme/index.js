import DefaultTheme, { VPHomeHero } from 'vitepress/theme'
import layout from './Layout.vue'

export default {
  ...DefaultTheme,

  Layout: layout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VPDocHero', VPHomeHero)
  }
}