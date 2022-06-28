import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["scr-to-svg"],
  },
  build: { sourcemap: true, target: "es2022" },
  plugins: [svelte()],
  server: {
    port: 8080,
  },
});
