import {
  subscriptionsSymbol,
  rawSymbol,
  observerSymbol,
  originSymbol,
} from './symbols'

export interface TransformFn<
  S extends object = object,
  T extends object = object
> {
  (object: S, prop: keyof S, val: S[keyof S]):
    | T[keyof T]
    | [keyof T, T[keyof T]]
    | void
    | null
}

export interface WarpProps<O extends object> {
  [subscriptionsSymbol]: Map<Warp, TransformFn>
  [observerSymbol]: Map<Warp, TransformFn>
  [originSymbol]: Set<Warp>
  [rawSymbol]: O
}

export type Warp<O extends object = object> = O & WarpProps<O>

export type GetRaw<O extends Warp> = O[typeof rawSymbol]

export type Queue<O extends object = object> = Map<O, Map<unknown, () => void>>

export type ExecMode = 'auto' | 'manual' | 'debounce'
