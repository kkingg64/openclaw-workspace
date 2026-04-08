/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'arena-bg': '#09090b',
        'arena-surface': '#18181b',
        'arena-elevated': '#27272a',
        'arena-cyan': '#00F5FF',
        'arena-magenta': '#FF00FF',
        'arena-gold': '#FFD700',
      },
      fontFamily: {
        title: ['Orbitron', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-up': 'floatUp 1.5s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-60px)' },
        },
      },
    },
  },
  plugins: [],
};
