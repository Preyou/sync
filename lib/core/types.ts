import {
  subscriptionsSymbol,
  rawSymbol,
  observerSymbol,
  originSymbol,
  setterSymbol,
} from './symbols'

export interface TransformFn {
  <S extends object, T extends object, K extends keyof S = keyof S>(
    object: S,
    prop: K,
    val: S[K]
  ): T[keyof T] | [keyof T, T[keyof T]][] | void | null
}

export type Setter<O extends object = object> = <K extends keyof O>(
  obj: O,
  prop: K,
  val: O[K]
) => boolean

export type Warp<O extends object = object> = O & WarpProps<O>
export interface WarpProps<O extends object> {
  [subscriptionsSymbol]: Map<Warp, TransformFn>
  [observerSymbol]: Map<Warp, TransformFn>
  [originSymbol]: Set<Warp>
  [rawSymbol]: O
  [setterSymbol]: Setter
}
export interface WarpOptions<O extends object> {
  watch?: (
    control: <K extends keyof O>(obj: O, prop: K, val: O[K]) => void
  ) => void
  setter?: Setter<O>
}

export type GetRaw<O extends Warp> = O[typeof rawSymbol]

export type Queue<O extends object = object> = Map<O, Map<unknown, () => void>>

export type ExecMode = 'auto' | 'manual' | 'debounce'
