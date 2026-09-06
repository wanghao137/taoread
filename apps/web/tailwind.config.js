/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0E1A38',
          800: '#16244C',
          700: '#223465',
          border: '#2E4278',
        },
        peach: {
          300: '#FFD3C4',
          400: '#FFB3A0',
          500: '#FF8E75',
        },
        moon: {
          300: '#FFE9B8',
          400: '#FFD97A',
        },
        ink: {
          primary: '#F4F1FF',
          secondary: '#B8C1E2',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'PingFang SC',
          'HarmonyOS Sans SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      minHeight: {
        touch: '4rem', // 64px：儿童触达最低标准（docs/03 第 5 夜审查重点）
      },
    },
  },
  plugins: [],
}
