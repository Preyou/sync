<template>
  <div />
</template>

<script setup lang="ts">
import { warp, control, observe, bind, setExecFrequency } from '@lib/core'
import type { Warp } from '@lib/core'
import * as reactiveUtils from '@geoscene/core/core/reactiveUtils'
import { toWgs84, getCoord } from '@turf/turf'
import { whenSceneView } from '../../hooks'

const { obj } = $defineProps<{
  obj: Warp
}>()

whenSceneView((view) => {
  let lock = false

  bind(
    warp(view, {
      watch(convert) {
        reactiveUtils.watch(
          () => view.camera,
          (val) => {
            if (lock) {
              lock = false
              return null
            }
            return convert(view, 'camera', val)
          }
        )
      },
      setter(object, prop, val) {
        lock = true
        return Reflect.set(object, prop, val)
      },
    }),
    obj,
    {
      control(car, p, v) {
        switch (p) {
          case 'camera': {
            const [x, y] = getCoord(
              toWgs84([v.position.x, v.position.y], { mutate: true })
            )
            return [
              ['x', x],
              ['y', y],
              ['z', v.position.z],
              ['heading', v.heading],
              ['pitch', v.tilt],
            ]
          }
          default:
            return null
        }
      },
      observe(car, p, v) {
        return [
          [
            'camera',
            {
              heading: car.heading,
              tilt: car.pitch,
              position: [car.x, car.y, car.z],
            },
          ],
        ]
      },
    }
  )
})
</script>
