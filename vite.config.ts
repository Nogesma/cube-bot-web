import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import viteCompression from "vite-plugin-compression";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  optimizeDeps: {
    exclude: ["scr-to-svg"],
  },
  build: { sourcemap: true, target: "esnext" },
  plugins: [
    wasm(),
    svelte(),
    viteCompression({
      filter: /\.(js|mjs|json|css|html|wasm|svg|map)$/i,
      algorithm: "brotliCompress",
    }),
    viteCompression({
      filter: /\.(js|mjs|json|css|html|wasm|svg|map)$/i,
      algorithm: "gzip",
    }),
  ],
  server: {
    port: 8080,
  },
});
