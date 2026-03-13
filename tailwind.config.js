/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        agenda: {
          dark: "#7A0C12",
          medium: "#9C1C22",
          gold: "#D6B06E",
          light: "#F4E4C1",
        },
      },
    },
  },

  plugins: [],
};
