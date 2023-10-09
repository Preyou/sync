<template>
  <div class="h-full w-full flex flex-col justify-around p-4">
    <div class="flex items-center gap-4">
      <n-form class="w-full" label-placement="left" label-width="auto">
        <n-form-item label="x">
          <n-input-number v-model:value="camera1.x" />
        </n-form-item>
        <n-form-item label="y">
          <n-input-number v-model:value="camera1.y" />
        </n-form-item>
        <n-form-item label="z">
          <n-input-number v-model:value="camera1.z" />
        </n-form-item>
      </n-form>
      <n-form class="w-full" label-placement="left" label-width="auto">
        <n-form-item label="x">
          <n-input-number v-model:value="camera2.x" />
        </n-form-item>
        <n-form-item label="y">
          <n-input-number v-model:value="camera2.y" />
        </n-form-item>
        <n-form-item label="z">
          <n-input-number v-model:value="camera2.z" />
        </n-form-item>
        <n-form-item label="heading">
          <n-input-number v-model:value="camera2.heading" />
        </n-form-item>
        <n-form-item label="pitch">
          <n-input-number v-model:value="camera2.pitch" />
        </n-form-item>
        <n-form-item label="roll">
          <n-input-number v-model:value="camera2.roll" />
        </n-form-item>
      </n-form>
      <n-form class="w-full" label-placement="left" label-width="auto">
        <n-form-item label="x">
          <n-input-number v-model:value="camera3.x" />
        </n-form-item>
        <n-form-item label="y">
          <n-input-number v-model:value="camera3.y" />
        </n-form-item>
        <n-form-item label="z">
          <n-input-number v-model:value="camera3.z" />
        </n-form-item>
        <n-form-item label="heading">
          <n-input-number v-model:value="camera3.heading" />
        </n-form-item>
        <n-form-item label="pitch">
          <n-input-number v-model:value="camera3.pitch" />
        </n-form-item>
        <n-form-item label="roll">
          <n-input-number v-model:value="camera3.roll" />
        </n-form-item>
      </n-form>
    </div>

    <div class="h-400px flex gap-4">
      <!-- <geo-scene :view-class="MapView"><sync-camera /></geo-scene>
      <geo-scene :view-class="SceneView"><sync-camera /></geo-scene> -->
      <geo-scene :view-class="SceneView"
        ><sync-camera :obj="camera2"
      /></geo-scene>
    </div>
  </div>
</template>

<script setup lang="ts">
import SceneView from '@geoscene/core/views/SceneView'
import MapView from '@geoscene/core/views/MapView'
import GeoScene from '@geo/components/GeoScene.vue'
import SyncCamera from '@geo/widgets/uiLess/SyncCamera.vue'
import { warp } from '@lib/core'

const camera1 = warp(
  reactive({
    x: 0,
    y: 0,
    z: 0,
  })
)

const camera2 = warp(
  reactive({
    x: 0,
    y: 0,
    z: 0,
    heading: 0,
    pitch: 0,
    roll: 0,
  })
)

const camera3 = warp(
  reactive({
    x: 0,
    y: 0,
    z: 0,
    heading: 0,
    pitch: 0,
    roll: 0,
  })
)
</script>
