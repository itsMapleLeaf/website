/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{astro,ts,tsx,js,jsx,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: `"Fira Sans", sans-serif`,
        condensed: `"Fira Sans Condensed", sans-serif`,
      },
    },
  },
}
