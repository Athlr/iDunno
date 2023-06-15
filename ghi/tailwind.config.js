/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        league: ['"League Spartan"', "sans-serif"],
      },
      colors: {
        salmon: "#f4b688",
        woodland: "#404824",
        cognac: "#A0411B",
        goldSand: "#E9B790",
        hunterGreen: "#3E5641",
        nyanza: "#DDFFD9",
        darkCyan: "#048A81",
        wine: "#723D46",
        navy: "#1e2936",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
