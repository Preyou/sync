import { subscriptionsSymbol, rawSymbol } from './symbols'
import { Warp } from './types'

export function isWarp(obj: object): obj is Warp<typeof obj> {
  return subscriptionsSymbol in obj
}

export function getRaw<O extends object>(obj: Warp<O>) {
  return obj[rawSymbol]
}
