import {
  observerSymbol,
  rawSymbol,
  subscriptionsSymbol,
  originSymbol,
} from './symbols'
import { joinQueue } from './sync'
import { Warp, GetRaw, TransformFn, WarpProps } from './types'
import { getRaw, isWarp } from './utils'

export function warp<O extends object>(obj: O): Warp<O> {
  const subscriptions = new Map<Warp, TransformFn>()
  const observer = new Map<Warp, TransformFn>()
  const origin = new Set<Warp>()
  const proxy = isWarp(obj)
    ? (obj as Warp<O>)
    : (new Proxy(obj, {
        set(object, prop, val) {
          Array.from(subscriptions)
            .filter(([target]) => !target[originSymbol].has(proxy))
            .forEach(([target, transform]) => {
              joinQueue(obj, prop as keyof O, () => {
                // @ts-ignore
                const res = transform(object, prop, val)
                const [k, v] = res instanceof Array ? res : [prop, res]
                target[originSymbol].add(proxy)
                origin.forEach(target[originSymbol].add)
                // @ts-ignore
                target[k] = v
              })
            })
          origin.clear()
          observer.forEach((transform, target) => {
            joinQueue(obj, prop as keyof O, () => {
              // @ts-ignore
              const res = transform(object, prop, val)
              const [k, v] = res instanceof Array ? res : [prop, res]
              // @ts-ignore
              getRaw(target)[k] = v
            })
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
            default:
              return Reflect.get(object, prop)
          }
        },
      }) as Warp<O>)
  return proxy
}

export function control<S extends Warp, T extends Warp>(
  source: S,
  target: T,
  transform: TransformFn<GetRaw<S>, GetRaw<T>> = (obj, prop, val) => val
) {
  source[subscriptionsSymbol].set(target, transform)
}

export function observe<S extends Warp, T extends Warp>(
  source: S,
  target: T,
  transform: TransformFn<GetRaw<T>, GetRaw<S>> = (obj, prop, val) => val
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
