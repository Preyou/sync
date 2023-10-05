import { Queue, ExecMode } from './types'

let lastUpdate = 0
let timer: NodeJS.Timeout
let execMode: ExecMode = 'auto'
const debouncedOptions = { debounce: 500, maxWait: 1000 }

const queue: Queue = new Map()

export function execQueue(q: Queue) {
  q.forEach((propQueue) => propQueue.forEach((fn) => fn()))
  queue.clear()
}

function autoExec() {
  execQueue(queue)
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
    execQueue(queue)
    return
  }
  timer = setTimeout(() => execQueue(queue), debounce)
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
  lastUpdate = Date.now()
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
export function joinQueue<O extends object>(
  obj: O,
  prop: keyof O,
  fn: () => void
) {
  if (!queue.has(obj)) {
    queue.set(obj, new Map())
  }

  const propQueue = queue.get(obj)!
  propQueue.set(prop, fn)
  update()
}

setExecFrequency()
