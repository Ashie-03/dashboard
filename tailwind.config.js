/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FAFBFF',
          dark: '#0B0F1E'
        },
        text: {
          DEFAULT: '#1B2559',
          dark: '#E6EAF8'
        },
        primary: {
          DEFAULT: '#6366F1',
          dark: '#818CF8'
        },
        secondary: {
          DEFAULT: '#F1F5FE',
          dark: '#1E2642'
        },
        error: {
          DEFAULT: '#F43F5E',
          dark: '#FB7185'
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#2A365D'
        },
        hover: {
          DEFAULT: '#F8FAFF',
          dark: '#151C35'
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#34D399'
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#FBBF24'
        },
        info: {
          DEFAULT: '#3B82F6',
          dark: '#60A5FA'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0px 2px 8px rgba(0,0,0,0.06)',
        'soft-dark': '0px 2px 8px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-right': 'slideRight 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};