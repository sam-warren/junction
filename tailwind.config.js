/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translateX(0%) translateY(0%)' },
          '100%': { transform: 'translateX(-100%) translateY(-15%)' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '20%': { opacity: 'var(--opacity)' },
          '80%': { opacity: 'var(--opacity)' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'float': 'float 20s linear infinite',
        'fadeInOut': 'fadeInOut 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}