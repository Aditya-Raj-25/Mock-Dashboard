/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9', // Primary brand color
          900: '#0c4a6e',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a', // standard slate-900 for dark mode
          muted: '#f8fafc', // slate-50
        },
        feedback: {
          success: '#10b981', // emerald-500
          error: '#ef4444',
          warning: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-out': 'fade-out 0.2s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
      }
    },
  },
  plugins: [],
}
