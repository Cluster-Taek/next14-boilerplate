import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            black: { value: '#1F1F1F' },
            white: { value: '#FFFFFF' },
            '01': {
              value: '#0096AA',
            },
            '02': {
              value: '#007C8C',
            },
          },
        },
      },
    },
  },
  jsxFramework: 'react',
  // The output directory for your css system
  outdir: 'styled-system',
});
