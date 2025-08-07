/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
           backdropBlur: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
    },

      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        accent: "#EC4899",
        dark: "#0f172a",
      },
      backgroundImage: {
        hero: "url('/your-hero-image.jpg')",
      },
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
      animation: {
        fade: "fadeIn 1s ease-in-out",
        zoom: "zoomIn 1s ease-in-out",
        ripple: "ripple 1s ease-out",
         gradient: "gradientMove 10s ease infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};