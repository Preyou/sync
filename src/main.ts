import '@/utils/initConfig'
import 'virtual:uno.css'
import '@/asset/globalStyle.css'
import '@headerless/split-box/style.css'
/* @ts-ignore * */
import { openCodeClient } from '@guijixing/vue-code-link'
import SplitBox from '@headerless/split-box'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import typescript from 'highlight.js/lib/languages/typescript'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import App from './App.vue'
import router from './router/index'
import SvgIcon from '~virtual/svg-component'
// highlight 的样式，依赖包，组件
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)

if (import.meta.env.DEV) {
  openCodeClient.init()
}

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(hljsVuePlugin)
  .component(SvgIcon.name, SvgIcon)
  .component('SplitBox', SplitBox)

app.config.warnHandler = (msg, instance, trace) => {
  if (msg.startsWith('Extraneous non-props attributes (code-location)')) {
    return
  }
  console.warn(msg, instance, trace)
}

app.mount('#app')
