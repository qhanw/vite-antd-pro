import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss';

import icons from './uno.config.icons';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': '-.125em',
      },
      collections: icons,
    }),
  ],
  // theme: {},
  // rules: [],
});
