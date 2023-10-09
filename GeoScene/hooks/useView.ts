import { viewSymbol, sceneViewSymbol, mapViewSymbol } from '@g/symbols'

export function useView() {
  const view = inject(viewSymbol)
  return view as Vue.ComputedRef<
    GeoScene.SceneView | GeoScene.MapView | undefined
  >
}

export function useSceneView() {
  const view = inject(sceneViewSymbol)
  return view as Vue.ComputedRef<GeoScene.SceneView | undefined>
}

export function useMapView() {
  const view = inject(mapViewSymbol)
  return view as Vue.ComputedRef<GeoScene.MapView | undefined>
}
