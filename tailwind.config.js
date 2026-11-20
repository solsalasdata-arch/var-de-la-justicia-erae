/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#101A14',
        evergreen: '#203627',
        mist: '#EFEFEF',
        white: '#EFEFEF',
        slate: {
          100: '#EFEFEF',
          200: '#E1E4E0',
          300: '#C8CEC8',
          400: '#A1ACA3',
          500: '#76827A',
          600: '#556158',
          700: '#3D4A41',
          800: '#2A3A2F',
          850: '#182A1F',
          900: '#14221A',
        },
        pitch: { DEFAULT: '#E8FF40', soft: '#F1FF85' },
        var: { DEFAULT: '#EFEFEF', soft: '#EFEFEF' },
        alert: { DEFAULT: '#C8102E', soft: '#FB7185' },
        ink: '#0B130E',
      },
      fontFamily: {
        serif: ['"Geist"', 'system-ui', 'sans-serif'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
        tv: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        rise: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        blink: 'blink 1.1s ease-in-out infinite',
        scan: 'scan 3.5s linear infinite',
        rise: 'rise .5s ease-out both',
      },
    },
  },
  plugins: [],
}
