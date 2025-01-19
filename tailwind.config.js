/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-text": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateX(0%) translateY(0%)" },
          "100%": { transform: "translateX(-100%) translateY(-15%)" },
        },
        fadeInOut: {
          "0%": { opacity: "0" },
          "20%": { opacity: "var(--opacity)" },
          "80%": { opacity: "var(--opacity)" },
          "100%": { opacity: "0" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-4px)" },
        },
        "float-base": {
          "0%": {
            transform: "translateX(0)",
            opacity: "0",
          },
          "15%": {
            transform: "translateX(15vw)",
            opacity: "var(--opacity)",
          },
          "85%": {
            transform: "translateX(85vw)",
            opacity: "var(--opacity)",
          },
          "100%": {
            transform: "translateX(100vw)",
            opacity: "0",
          },
        },
        "draw-path": {
          from: {
            strokeDashoffset: "100",
          },
          to: {
            strokeDashoffset: "0",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "error-in": {
          "0%": {
            opacity: "0",
            height: "0",
            transform: "translateY(-6px)",
          },
          "100%": {
            opacity: "1",
            height: "24px",
            transform: "translateY(0)",
          },
        },
        "error-out": {
          "0%": {
            opacity: "1",
            height: "24px",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            height: "0",
            transform: "translateY(-6px)",
          },
        },
      },
      animation: {
        "background-float": "float 20s linear infinite",
        "fade-in-out": "fadeInOut 20s ease-in-out infinite",
        "slide-down-fade": "slideDownAndFade 0.2s ease-out",
        "slide-up-fade": "slideUpAndFade 0.2s ease-out",
        float: "float-base var(--duration) linear infinite var(--delay)",
        draw: "draw-path 2.5s ease forwards",
        "error-in": "error-in 0.2s ease-out forwards",
        "error-out": "error-out 0.2s ease-out forwards",
        "fade-up": "fade-in-up 0.8s ease-out forwards",
        "fade-up-200": "fade-in-up 0.8s ease-out forwards 0.2s",
        "fade-up-400": "fade-in-up 0.8s ease-out forwards 0.4s",
        "fade-up-600": "fade-in-up 0.8s ease-out forwards 0.6s",
      },
    },
  },
  plugins: [],
};
