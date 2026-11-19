/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070B14',
        slate: { 850: '#0F172A' },
        pitch: '#10B981',
        var: '#F59E0B',
        alert: { DEFAULT: '#E11D48', soft: '#FB7185' },
        ink: '#0A0F1F',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
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
