const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
      },
      fontFamily: {
        sans: `"Fira Sans", sans-serif`,
        condensed: `"Fira Sans Condensed", sans-serif`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
