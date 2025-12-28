import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "FormWidget",
      formats: ["iife"],
      fileName: () => "form-widget.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "form-widget.css",
      },
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
