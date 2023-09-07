import type { Config } from "tailwindcss"

export default {
  content: ["src/**/*.{astro,ts,tsx,js,jsx,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: `"Fira Sans", sans-serif`,
        condensed: `"Fira Sans Condensed", sans-serif`,
      },
    },
  },
} satisfies Config
