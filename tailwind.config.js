/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080b',
          900: '#0a0c10',
          850: '#0e1117',
          800: '#121620',
          700: '#181d28',
          600: '#232938',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          soft: 'rgba(59, 130, 246, 0.12)',
          border: 'rgba(59, 130, 246, 0.3)',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          hover: '#20ba5a',
          soft: 'rgba(37, 211, 102, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite alternate',
        'float-delayed': 'float 5s ease-in-out 2.5s infinite alternate',
        'pulse-subtle': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'border-beam': 'borderBeam 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderBeam: {
          '100%': { 'offset-distance': '100%' },
        }
      }
    },
  },
  plugins: [],
}
