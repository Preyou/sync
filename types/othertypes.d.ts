import '@vue/runtime-core'
import 'vue-router'
import 'naive-ui'
import '@vueuse/core'
import 'vue'

declare module '@vue/runtime-core' {}
declare global {
  declare namespace Vue {
    export * from 'vue'
  }
  declare namespace NaiveUI {
    export * from 'naive-ui'
  }
  declare namespace Vueuse {
    export * from '@vueuse/core'
  }

  export import GeoScene = __geoscene
}

declare module 'vue-router' {
  interface RouteMeta {
    /** 显示的标题，如果没有则取路由的name */
    title?: string
    /** 是否在自动构造的菜单上隐藏 */
    hidden?: boolean
    /** 自动构造时同一级菜单的排序 */
    order?: number
  }
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SplitBox: typeof import('@headerless/split-box').default
    highlightjs: typeof import('@highlightjs/vue-plugin').default.component
  }
}
