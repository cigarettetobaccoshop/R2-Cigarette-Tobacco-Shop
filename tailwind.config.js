/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        tembakau: {
          50: '#FAF3EA',
          100: '#F0E0C9',
          400: '#A9762F',
          600: '#96602E',
          700: '#8B5A2B',
          800: '#6B4423',
          900: '#3D2712',
        },
        emas: {
          300: '#E6CC7A',
          400: '#DDC05A',
          500: '#D4AF37',
          600: '#B8942A',
        },
      },
      boxShadow: {
        card: '0 8px 24px -8px rgba(59, 39, 18, 0.25)',
      },
    },
  },
  plugins: [],
};
