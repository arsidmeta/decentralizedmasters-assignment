/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: '#8b5cf6',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        bg: {
          DEFAULT: '#0f172a',
          secondary: '#1e293b',
          tertiary: '#334155',
        },
        text: {
          DEFAULT: '#f1f5f9',
          secondary: '#cbd5e1',
        },
        border: '#475569',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-bg': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      animation: {
        'spin-slow': 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [],
}

