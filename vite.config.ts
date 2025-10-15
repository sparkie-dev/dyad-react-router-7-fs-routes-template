import { defineConfig } from "vite";
import sparkieComponentTagger from "@sparkie-dev/react-vite-component-tagger";
import path from "path";
import { reactRouter } from "@react-router/dev/vite";
import react from "@vitejs/plugin-react-swc";

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
  plugins: [react(), sparkieComponentTagger(), reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@prisma-client": path.resolve(__dirname, "./src/prisma/generated"),
    },
  },
}));
