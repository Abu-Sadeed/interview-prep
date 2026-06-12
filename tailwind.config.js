/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: '#090c10',
        bg2: '#0f1318',
        bg3: '#151a22',
        bg4: '#1b2230',
        border: '#1e2736',
        border2: '#2a3650',
        border3: '#3a4d6a',
        text: '#dde4f0',
        text2: '#8a97b0',
        text3: '#4a5872',
      },
    },
  },
  plugins: [],
};
