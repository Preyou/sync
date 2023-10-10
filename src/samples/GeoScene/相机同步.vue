<template>
  <geo-scene :view-class="SceneView">
    <camera-info :camera-model="camera" />
  </geo-scene>
  <geo-scene :view-class="SceneView">
    <camera-info :camera-model="camera" />
  </geo-scene>
  <geo-scene :view-class="SceneView">
    <camera-info :camera-model="camera" />
  </geo-scene>
</template>

<script setup lang="ts">
import SceneView from '@geoscene/core/views/SceneView'
import GeoScene from '@geo/components/GeoScene.vue'
import { warp } from '@lib/core'

import CameraInfo from '@geo/widgets/CameraInfo.vue'

const camera = warp(reactive({}))
</script>
