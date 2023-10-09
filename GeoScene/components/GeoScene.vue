<template>
  <div class="relative h-full w-full">
    <link
      rel="stylesheet"
      type="text/css"
      :href="isDark ? darkTheme : lightTheme"
    />
    <div ref="container" class="h-full w-full" />
    <div
      v-if="!!view"
      class="pointer-events-none absolute left-0 top-0 h-full w-full [&>*]:pointer-events-auto"
    >
      <slot />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends typeof GeoScene.SceneView | typeof GeoScene.MapView"
>
import Map from '@geoscene/core/Map'
import { whenever, useDark, computedWithControl } from '@vueuse/core'
import darkTheme from '@geoscene/core/assets/geoscene/themes/dark/main.css?url'
import lightTheme from '@geoscene/core/assets/geoscene/themes/light/main.css?url'
import { viewSymbol, sceneViewSymbol, mapViewSymbol } from '../symbols'

const isDark = useDark()

const { viewClass: ViewClass, properties = {} } = $defineProps<{
  viewClass: T
  properties?: T extends typeof GeoScene.SceneView
    ? GeoScene.SceneViewProperties
    : GeoScene.MapViewProperties
}>()

const $emit = defineEmits<{
  init: [view: InstanceType<T>]
  when: [view: InstanceType<T>]
}>()

const container = ref<HTMLDivElement>()

const map = new Map({
  basemap: 'tianditu-image',
})

const view = computed(() => {
  return ViewClass
    ? new ViewClass({
        map,
        ...properties,
        container: container.value,
      })
    : undefined
})

provide(viewSymbol, view)

provide(
  sceneViewSymbol,
  computedWithControl(
    () => view.value,
    () =>
      view.value?.declaredClass === 'geoscene.views.SceneView'
        ? view.value
        : undefined
  )
)

provide(
  mapViewSymbol,
  computedWithControl(
    () => view.value,
    () =>
      view.value?.declaredClass === 'geoscene.views.MapView'
        ? view.value
        : undefined
  )
)

whenever(
  () => view.value,
  () => {
    $emit('init', view.value as InstanceType<T>)
    view.value!.when(() => $emit('when', view.value as InstanceType<T>))
  }
)

defineExpose({
  view,
})
</script>

<style scoped></style>
