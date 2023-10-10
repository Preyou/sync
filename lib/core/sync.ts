import { Queue, ExecMode, Warp } from './types'
import { originSymbol } from './symbols'

let lastUpdate = 0
let timer: NodeJS.Timeout
let execMode: ExecMode = 'auto'
const debouncedOptions = { debounce: 500, maxWait: 1000 }

const transformQueue: Queue = new Map()
const mutateQueue: Queue = new Map()
const lockQueue = new Set<Warp>()

function execQueue(q: Queue) {
  q.forEach((propQueue) => propQueue.forEach((fn) => fn()))
  q.clear()
}

export function runQueue() {
  lastUpdate = Date.now()
  execQueue(transformQueue)
  queueMicrotask(() => {
    execQueue(mutateQueue)
    lockQueue.forEach((warp) => warp[originSymbol].clear())
    lockQueue.clear()
  })
}

function autoExec() {
  runQueue()
  if (execMode === 'auto') {
    requestAnimationFrame(autoExec)
  }
}

export function debouncedExec({
  debounce = debouncedOptions.debounce,
  maxWait = debouncedOptions.maxWait,
} = {}) {
  clearTimeout(timer)
  if (Date.now() - lastUpdate > maxWait) {
    runQueue()
    return
  }
  timer = setTimeout(() => runQueue(), debounce)
}

export function setExecFrequency(
  mode: ExecMode = 'auto',
  options: typeof mode extends 'debounce'
    ? { debounce?: number; maxWait?: number }
    : never = {} as never
) {
  execMode = mode
  if (mode === 'auto') {
    autoExec()
  }
  if (mode === 'debounce') {
    Object.assign(debouncedOptions, options)
  }
}

export function update() {
  switch (execMode) {
    case 'auto':
      break
    case 'manual':
      break
    case 'debounce':
      debouncedExec()
      break
    default:
      break
  }
}

export function joinTransformQueue<O extends Warp>(
  obj: O,
  prop: unknown,
  fn: () => void
) {
  if (!transformQueue.has(obj)) {
    transformQueue.set(obj, new Map())
  }

  const propQueue = transformQueue.get(obj)!
  propQueue.set(prop, fn)
  update()
}

export function joinMutateQueue<O extends object, K extends keyof O = keyof O>(
  obj: O,
  prop: K,
  fn: () => void
) {
  if (!mutateQueue.has(obj)) {
    mutateQueue.set(obj, new Map())
  }

  const propQueue = mutateQueue.get(obj)!
  propQueue.set(prop, fn)
}

export function joinLockQueue(warp: Warp) {
  lockQueue.add(warp)
}

setExecFrequency()
