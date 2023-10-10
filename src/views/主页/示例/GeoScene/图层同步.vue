<template>
  <split-box>
    <g-show-code :code="code" class="h-full" />
    <vue-comp />
  </split-box>
</template>

<script setup lang="ts">
import VueComp from '@/samples/GeoScene/图层同步.vue'
import code from '@/samples/GeoScene/图层同步.vue?raw'

definePage({
  name: '图层同步',
})
</script>
