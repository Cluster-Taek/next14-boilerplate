/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@medusajs/ui-preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
