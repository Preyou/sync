<template>
  <geo-scene :view-class="SceneView" @when="$event.map.add(layer1)">
    <layer-info :layer-view="layer1" :layer-model="layerModel" />
  </geo-scene>
  <geo-scene :view-class="SceneView" @when="$event.map.add(layer2)">
    <layer-info :layer-view="layer2" :layer-model="layerModel" />
  </geo-scene>
  <geo-scene :view-class="SceneView" @when="$event.map.add(layer3)">
    <layer-info :layer-view="layer3" :layer-model="layerModel" />
  </geo-scene>
</template>

<script setup lang="ts">
import SceneView from '@geoscene/core/views/SceneView'
import FeatureLayer from '@geoscene/core/layers/FeatureLayer'
import GeoScene from '@geo/components/GeoScene.vue'
import { warp } from '@lib/core'
import LayerInfo from '@geo/widgets/LayerInfo.vue'

const layerModel = warp(
  reactive({
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
  })
)

const layer1 = new FeatureLayer(layerModel)
const layer2 = new FeatureLayer(layerModel)
const layer3 = new FeatureLayer(layerModel)
console.log(layer1, layer2, layer3)
</script>
