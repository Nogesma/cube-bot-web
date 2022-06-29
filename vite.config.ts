import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["scr-to-svg"],
  },
  build: { sourcemap: true, target: "es2022" },
  plugins: [
    svelte(),
    viteCompression({
      filter: /\.(js|mjs|json|css|html|wasm)$/i,
      algorithm: "brotliCompress",
    }),
    viteCompression({
      filter: /\.(js|mjs|json|css|html|wasm)$/i,
      algorithm: "gzip",
    }),
  ],
  server: {
    port: 8080,
  },
});
