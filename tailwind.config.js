export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0f6be8',
          600: '#065edb',
          700: '#064bb0',
        },
        ink: '#0b1533',
      },
      boxShadow: {
        panel: '0 12px 30px rgba(15, 35, 85, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
