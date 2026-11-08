/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Matte black / deep navy backgrounds
        base: {
          950: '#05070d',
          900: '#0a0e17',
          850: '#0d121d',
          800: '#111726',
          750: '#161d2f',
          700: '#1b2438',
        },
        // Champagne gold accent
        gold: {
          50: '#fbf6e9',
          100: '#f6ecd0',
          200: '#ecd9a3',
          300: '#e0c171',
          400: '#d4a84a',
          500: '#c39a3a', // primary champagne gold
          600: '#a87f2e',
          700: '#836427',
          800: '#5f4820',
          900: '#3f3015',
        },
        // Electric green for positive indicators
        bull: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        // Subtle red for negative indicators
        bear: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        silver: {
          100: '#e8edf5',
          300: '#c2cad9',
          400: '#9aa5bd',
          500: '#7b879e',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.3em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 40s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'dash': 'dash 2s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        dash: {
          to: { strokeDashoffset: '-20' },
        },
      },
    },
  },
  plugins: [],
};
