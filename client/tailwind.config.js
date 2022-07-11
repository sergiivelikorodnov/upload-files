/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Roboto'],
      body: ['"Open Sans"']
    },
    extend: {
      colors: {
        'app-blue': 'rgb(14 165 233)'
      }
    }
  },
  plugins: []
}
