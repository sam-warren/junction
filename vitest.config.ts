import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
