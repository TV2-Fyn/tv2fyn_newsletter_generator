/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'tv2-dark-blue': '#000523',
        'tv2-blue': '#1E1991',
        'tv2-bordeaux': '#640014',
        'tv2-red': '#F0281E',
        'tv2-light-red': '#EB8C82',
        'tv2-violet': '#A596FA',
        'tv2-lavender': '#E6D7FF',
        'tv2-peach': '#FFE6D7',
        'tv2-yellow': '#FFD200',
        'rd-purple': '#5C40CA',
        'rd-black': '#181818',
        'rd-light-gray': '#F8F8F8',
        'rd-gray':  '#444642',
        'rd-green-gray':  '#B6B9B3',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' if you want to use the OS setting
  variants: {
    extend: {},
  },
  plugins: [],
}
