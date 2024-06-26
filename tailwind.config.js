const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        courier: ["Courier Prime"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
    },
  },
  plugins: [flowbite.plugin()],
};
