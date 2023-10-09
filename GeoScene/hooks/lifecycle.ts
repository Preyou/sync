import { whenever } from '@vueuse/core'
import { useView, useSceneView, useMapView } from './useView'

export function onViewInit(
  callback: (view: GeoScene.SceneView | GeoScene.MapView) => void
) {
  const view = useView()
  whenever(
    () => view.value,
    () => {
      callback(view.value!)
    },
    {
      immediate: true,
    }
  )
}

export function onSceneViewInit(callback: (view: GeoScene.SceneView) => void) {
  const view = useSceneView()
  whenever(
    () => view.value,
    () => {
      callback(view.value!)
    },
    {
      immediate: true,
    }
  )
}

export function onMapViewInit(callback: (view: GeoScene.MapView) => void) {
  const view = useMapView()
  whenever(
    () => view.value,
    () => {
      callback(view.value!)
    },
    {
      immediate: true,
    }
  )
}

export function whenView(
  callback: (view: GeoScene.SceneView | GeoScene.MapView) => void
) {
  onViewInit((view) => {
    view.when(() => callback(view))
  })
}

export function whenSceneView(callback: (view: GeoScene.SceneView) => void) {
  onSceneViewInit((view) => {
    view.when(() => callback(view))
  })
}

export function whenMapView(callback: (view: GeoScene.MapView) => void) {
  onMapViewInit((view) => {
    view.when(() => callback(view))
  })
}
