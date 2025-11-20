/** @type {import('tailwindcss').Config} */
module.exports = {
  ontent: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"], // Adjust paths as needed
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
