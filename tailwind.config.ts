import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Monochrome Palette
        'mono': {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#303030',
          950: '#212121',
          1000: '#000000',
        },
        // Legacy compatibility
        primary: {
          50: '#F5F5F5',
          100: '#EBEBEB',
          500: '#000000',
          600: '#000000',
          700: '#212121',
        },
        ai: {
          100: '#F5F5F5',
          500: '#424242',
          600: '#303030',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Keep error color
        error: {
          500: '#DC2626',
        },
        rose: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
        },
      },
      borderRadius: {
        'bubble': '20px',
        'input': '16px',
        'card': '16px',
      },
      boxShadow: {
        'offset-sm': '2px 2px 0px rgba(0, 0, 0, 0.1)',
        'offset-md': '3px 3px 0px rgba(0, 0, 0, 0.15)',
        'offset-lg': '4px 4px 0px rgba(0, 0, 0, 0.15)',
        'offset-xl': '6px 6px 0px rgba(0, 0, 0, 0.2)',
        'brutal': '4px 4px 0px #000000',
        'brutal-sm': '2px 2px 0px #000000',
        'brutal-lg': '6px 6px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-right': 'slideInRight 0.4s ease-out forwards',
        'slide-left': 'slideInLeft 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
