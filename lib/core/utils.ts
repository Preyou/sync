import { subscriptionsSymbol, rawSymbol } from './symbols'
import { Warp } from './types'

export function isWarp(obj: object): obj is Warp<typeof obj> {
  return subscriptionsSymbol in obj
}

export function getRaw(obj: Warp) {
  return obj[rawSymbol]
}
