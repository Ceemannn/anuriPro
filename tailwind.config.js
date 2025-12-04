/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wine: {
          primary: '#c9632b',
          secondary: '#631b23',
          accent: '#2f2220',
          cream: '#c5b599',
          dark: '#1a0a0d',
          light: '#f5ebe0',
          burgundy: '#722F37',
          rose: '#b76e79',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'glass': '8px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'bubble-rise': 'bubbleRise 6s ease-in-out infinite',
        'bubble-rise-slow': 'bubbleRise 8s ease-in-out infinite',
        'bubble-rise-fast': 'bubbleRise 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pour': 'pour 2s ease-out forwards',
        'splash': 'splash 0.3s ease-out',
        'flip': 'flip 0.6s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        bubbleRise: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        pour: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        splash: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        flip: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(180deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(99, 27, 35, 0.2)',
        'glass-hover': '0 8px 40px 0 rgba(99, 27, 35, 0.35)',
        'wine': '0 4px 20px 0 rgba(201, 99, 43, 0.3)',
      },
    },
  },
  plugins: [],
}
