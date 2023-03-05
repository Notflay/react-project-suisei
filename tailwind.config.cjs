/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        2: "repeat(2, minmax(0, 0.27fr))",
        
        // Complex site-specific column configuratio
      },
    },
  },
  plugins: [],
};
