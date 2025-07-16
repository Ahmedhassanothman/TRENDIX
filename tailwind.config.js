/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        // Light mode colors
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f3f4f6',
            tertiary: '#e5e7eb'
          },
          text: {
            primary: '#111827',
            secondary: '#374151',
            tertiary: '#6b7280'
          }
        },
        // Dark mode colors
        dark: {
          bg: {
            primary: '#000000',
            secondary: '#1a1a1a',
            tertiary: '#333333'
          },
          text: {
            primary: '#ffffff',
            secondary: '#cccccc',
            tertiary: '#999999'
          }
        }
      },
      boxShadow: {
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
      animation: {
        blob: "blob 7s infinite",
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-out': 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
