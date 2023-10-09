import { computedWithControl } from '@vueuse/core'

export function useSyncCamera(view: Vue.WatchSource<GeoScene.SceneView>) {
  return computedWithControl(view, () => {
    return {}
  })
}
