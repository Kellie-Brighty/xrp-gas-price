/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "xrp-blue": "#23292F",
        "xrp-light": "#27A2DB",
        "northern-dark": "#1A1B1E",
        "northern-accent": "#2E3238",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui"],
      },
    },
  },
  plugins: [],
};
