import preact from "@astrojs/preact"
import tailwind from "@astrojs/tailwind"
import deno from "@deno/astro-adapter"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  output: "hybrid",
  adapter: deno(),
})
