import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./lib/index",
      },
      formats: ["es"],
    },
  },
});
