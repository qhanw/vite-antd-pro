import { defineConfig, presetAttributify, presetWind4, presetIcons } from 'unocss';

import icons from './uno.config.icons';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4(),
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
