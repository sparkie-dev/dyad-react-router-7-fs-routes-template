import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import path from "path";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.message.includes("@react-router/dev/routes") ||
          warning.message.includes('Module "fs" has been externalized') ||
          warning.message.includes('Module "path" has been externalized')
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [dyadComponentTagger(), reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@prisma-client": path.resolve(__dirname, "./src/prisma/generated")
    },
  },
}));