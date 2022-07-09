// @ts-check
/** @type {import('prettier').Config} */
module.exports = {
  ...require("@itsmapleleaf/configs/prettier"),
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
