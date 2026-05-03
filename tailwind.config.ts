import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1E293B',
        foreground: '#E2E8F0',
        primary: '#A855F7',
        secondary: '#94A3B8',
        success: '#4ADE80',
        danger: '#FB7185',
        warning: '#F59E0B',
        'dark-gold': '#A855F7',
        'surface': 'rgba(16, 23, 42, 0.5)',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "breathing": "breathing 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff' },
          '100%': { boxShadow: '0 0 20px #00f0ff, 0 0 30px #00f0ff' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
