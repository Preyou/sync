import {
  observerSymbol,
  rawSymbol,
  subscriptionsSymbol,
  originSymbol,
  setterSymbol,
} from './symbols'
import { joinTransformQueue, joinMutateQueue, joinLockQueue } from './sync'
import { Warp, TransformFn, WarpOptions } from './types'
import { getRaw, isWarp } from './utils'

function set<O extends object, K extends keyof O>(
  object: O,
  prop: K,
  val: O[K],
  {
    subscriptions,
    observer,
    origin,
    proxy,
  }: {
    subscriptions: Map<Warp, TransformFn>
    observer: Map<Warp, TransformFn>
    origin: Set<Warp>
    proxy: Warp<O>
  }
) {
  joinLockQueue(proxy)
  Array.from(subscriptions)
    .filter(([target]) => !target[originSymbol].has(proxy))
    .forEach(([target, transform]) => {
      joinTransformQueue(target, prop, () => {
        const res = transform(object, prop, val)
        if (!res) {
          return
        }
        target[originSymbol].add(proxy)
        origin.forEach(target[originSymbol].add)
        if (res instanceof Array) {
          res.forEach(([k, v]) => {
            joinMutateQueue(target, k, () => Reflect.set(target, k, v))
          })
        } else {
          // @ts-ignore
          joinMutateQueue(target, prop, () => Reflect.set(target, prop, res))
        }
      })
    })
  Array.from(observer)
    .filter(([target]) => !proxy[originSymbol].has(target))
    .forEach(([target, transform]) => {
      joinTransformQueue(target, prop, () => {
        const res = transform(object, prop, val)
        if (!res) {
          return
        }
        const raw = getRaw(target)
        if (res instanceof Array) {
          res.forEach(([k, v]) => {
            joinMutateQueue(raw, k, () => target[setterSymbol](raw, k, v))
          })
        } else {
          // @ts-ignore
          joinMutateQueue(raw, prop, () => target[setterSymbol](raw, prop, res))
        }
      })
    })
}

export function warp<O extends object>(
  obj: O,
  { watch, setter }: WarpOptions<O> = {}
): Warp<O> {
  const subscriptions = new Map<Warp, TransformFn>()
  const observer = new Map<Warp, TransformFn>()
  const origin = new Set<Warp>()
  const proxy: Warp<O> = isWarp(obj)
    ? (obj as Warp<O>)
    : (new Proxy(obj, {
        set(object, prop, val) {
          set(proxy, prop as keyof O, val, {
            subscriptions,
            observer,
            origin,
            proxy,
          })
          return Reflect.set(object, prop, val)
        },
        get(object, prop) {
          switch (prop) {
            case subscriptionsSymbol:
              return subscriptions
            case observerSymbol:
              return observer
            case originSymbol:
              return origin
            case rawSymbol:
              return obj
            case setterSymbol:
              return (
                setter ??
                (<K extends keyof O>(o: O, p: K, v: O[K]) => {
                  Reflect.set(o, p, v)
                })
              )
            default:
              return Reflect.get(object, prop)
          }
        },
      }) as Warp<O>)
  watch?.((...arg) => set(...arg, { subscriptions, observer, origin, proxy }))

  return proxy
}

export function control<S extends Warp, T extends Warp>(
  source: S,
  target: T,
  transform: TransformFn = (obj, prop, val) => val
) {
  source[subscriptionsSymbol].set(target, transform)
}

export function observe<S extends Warp, T extends Warp>(
  source: S,
  target: T,
  transform: TransformFn = (obj, prop, val) => val
) {
  target[observerSymbol].set(source, transform)
}

export function bind<S extends Warp, T extends Warp>(
  source: S,
  target: T,
  {
    control: c = (obj, prop, val) => val,
    observe: o = (obj, prop, val) => val,
  }: {
    control?: Parameters<typeof control<S, T>>[2]
    observe?: Parameters<typeof observe<S, T>>[2]
  } = {}
) {
  control(source, target, c)
  observe(source, target, o)
}

export function subscribe<S extends Warp>(source: S) {
  return {
    control: <T extends Warp>(
      target: T,
      transform?: Parameters<typeof control<S, T>>[2]
    ) => control(source, target, transform),
    observe: <T extends Warp>(
      target: T,
      transform?: Parameters<typeof observe<S, T>>[2]
    ) => observe(source, target, transform),
    bind: <T extends Warp>(
      target: T,
      { control: c, observe: o }: Parameters<typeof bind<S, T>>[2] = {}
    ) => bind(source, target, { control: c, observe: o }),
  }
}
