<template>
  <div class="grid grid-cols-2 grid-rows-2 h-full w-full gap-4">
    <div class="flex flex-col items-center justify-center gap-2">
      <n-input v-model:value="obj1.a" />
      <n-input v-model:value="obj1.b" />
      <n-input v-model:value="obj1.c" />
    </div>
    <div class="flex flex-col items-center justify-center gap-2">
      <n-input v-model:value="obj2.aa" />
      <n-input v-model:value="obj2.bb" />
      <n-input v-model:value="obj2.cc" />
    </div>
    <div class="flex flex-col items-center justify-center gap-2">
      <n-input v-model:value="obj3.a" />
      <n-input v-model:value="obj3.b" />
      <n-input v-model:value="obj3.c" />
    </div>
    <div class="flex flex-col items-center justify-center gap-2">
      <n-input v-model:value="obj4.a" />
      <n-input v-model:value="obj4.b" />
      <n-input v-model:value="obj4.c" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { warp, control, observe, bind, setExecFrequency } from '@lib/core'

// setExecFrequency('debounce')

const obj1 = warp(
  reactive({
    a: '1',
    b: '2',
    c: '3',
  })
)

const obj2 = warp(
  reactive({
    aa: '1',
    bb: '2',
    cc: '3',
  })
)

const obj3 = warp(
  reactive({
    a: '1',
    b: '2',
    c: '3',
  })
)
bind(obj1, obj2, {
  control(o1, p, v) {
    return [p + p, v]
  },
  observe(o2, p, v) {
    return [p.slice(1), v]
  },
})
bind(obj1, obj3)

const obj4 = warp(
  reactive({
    a: '1',
    b: '2',
    c: '3',
  })
)
</script>
