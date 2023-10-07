<template>
  <div class="h-full w-full flex flex-col justify-around">
    <div ref="obj1Ref" class="flex flex-col items-center justify-center gap-2">
      <n-input v-model:value="obj1.a" />
      <n-input v-model:value="obj1.b" />
      <n-input v-model:value="obj1.c" />
    </div>

    <div class="flex justify-around gap-4">
      <div
        ref="obj2Ref"
        class="w-full flex flex-col items-center justify-center gap-2"
      >
        <n-input v-model:value="obj2.aa" />
        <n-input v-model:value="obj2.bb" />
        <n-input v-model:value="obj2.cc" />
      </div>
      <div
        ref="obj3Ref"
        class="w-full flex flex-col items-center justify-center gap-2"
      >
        <n-input v-model:value="obj3.a" />
        <n-input v-model:value="obj3.b" />
        <n-input v-model:value="obj3.c" />
      </div>
      <div
        ref="obj4Ref"
        class="w-full flex flex-col items-center justify-center gap-2"
      >
        <n-input v-model:value="obj4.a" />
        <n-input v-model:value="obj4.b" />
        <n-input v-model:value="obj4.c" />
      </div>
    </div>

    <g-link-line-simple
      :head="obj2Ref"
      :head-anchor="'t'"
      :tail="obj1Ref"
      :tail-anchor="'b'"
    />
    <g-link-line-simple
      :head="obj3Ref"
      :head-anchor="'t'"
      :tail="obj1Ref"
      :tail-anchor="'b'"
    />
    <g-link-line-simple
      :head="obj4Ref"
      :head-anchor="'t'"
      :tail="obj1Ref"
      :tail-anchor="'b'"
    />
  </div>
</template>

<script setup lang="ts">
import { warp, control, observe, bind, setExecFrequency } from '@lib/core'

const obj1Ref = ref<HTMLElement>()
const obj2Ref = ref<HTMLElement>()
const obj3Ref = ref<HTMLElement>()
const obj4Ref = ref<HTMLElement>()
// setExecFrequency('debounce')
const obj1 = warp(
  reactive({
    a: '1',
    b: '2',
    // c: '3',
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

const obj4 = warp(
  reactive({
    a: '1',
    b: '2',
    c: '3',
  })
)
bind(obj3, obj1)
</script>
