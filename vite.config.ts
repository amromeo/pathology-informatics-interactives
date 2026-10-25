import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    __COMMIT__: JSON.stringify((process.env.GITHUB_SHA ?? "local-review").slice(0, 12)),
  },
  base: process.env.PAGES_BASE ?? "/pathology-informatics-interactives/",
  build: {
    chunkSizeWarningLimit: 300,
    outDir: "pages-dist",
    emptyOutDir: true,
  },
  plugins: [mdx({ remarkPlugins: [remarkGfm] }), react()],
});
