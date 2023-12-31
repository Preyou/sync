import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import presetTagify from '@unocss/preset-tagify'
import { presetExtra } from 'unocss-preset-extra'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  // https://unocss.vercel.app/options
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
    }),
    presetIcons({
      autoInstall: false,
      warn: true,
    }),
    presetTagify({
      prefix: 'un-',
    }),
    presetExtra(),
    presetScrollbar({
      // config
    }),
  ],
  transformers: [transformerCompileClass(),transformerVariantGroup()],

  shortcuts: [
    // you could still have object style
    // {
    //   btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    // },
    // // dynamic shortcuts
    // [/^flex(-(row|col))?(-)?$/, ([a, , c]) => `flex flex-col`],
  ],
  rules: [
    // css变量
    [/^(\$((\w|-)+))-(\[(.+)\])$/, (match) => {
      let obj = {}
      obj[`--${match[2]}`] = match[5]
      return obj
    }],
  ],
})
