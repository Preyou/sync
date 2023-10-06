<template>
  <split-box>
    <g-show-code :code="code" class="h-full" />
    <vue-comp />
  </split-box>
</template>

<script setup lang="ts">
import VueComp from '@/samples/多对象同步.vue'
import code from '@/samples/多对象同步.vue?raw'

definePage({
  name: '多对象同步',
})
</script>
