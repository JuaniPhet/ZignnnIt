/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      Urbanist : ["Urbanist", "serif"],
    },
    screens: {
      sm: "340px",
      md: "540px",
      lg: "768px",
      xl: "1180px",
      xxl: "1280px",
    },
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px",
      },
    },
  },
  plugins: [],
};
