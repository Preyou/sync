<template>
  <router-view />
</template>

<script setup lang="ts">
definePage({
  name: 'GeoScene',
  redirect: {
    name: '相机同步',
  },
})
</script>
