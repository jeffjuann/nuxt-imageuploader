/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00DC82',
        'primary-foreground': '#000000',
        'muted': '#F4F4F5',
        'muted-foreground': '#71717A',
      },

    },
  },
  plugins: [],
}