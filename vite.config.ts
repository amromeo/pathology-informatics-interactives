import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/pathology-informatics-interactives/" : "/",
  build: {
    outDir: "pages-dist",
    emptyOutDir: true,
  },
  plugins: [mdx({ remarkPlugins: [remarkGfm] }), react()],
});
