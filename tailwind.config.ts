import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: {
          500: "#24AE7C",  // Primary action color
          600: "#0D2A1F",  // Darker green for hover states
        },
        blue: {
          500: "#79B5EC",  // Soft blue for backgrounds and accents
          600: "#152432",  // Darker blue for text or accents
        },
        red: {
          500: "#F37877",  // Warning/error messages
        },
        light: {
          200: "#E8E9E9",  // Light gray for backgrounds
        },
        dark: {
          200: "#0D0F10",  // Dark mode backgrounds
          400: "#1A1D21",  // Main dark shade
          500: "#363A3D",  // Darker accents
          700: "#ABB8C4",  // Light gray for text in dark mode
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],  // Custom font for the project
      },
      backgroundImage: {
        // Removed unnecessary background images
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
