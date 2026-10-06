import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^src\//, replacement: `${import.meta.dirname}/src/` },
      { find: /^public\//, replacement: `${import.meta.dirname}/public/` },
    ],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.test.*",
        "**/*.d.ts",
        // Renders through satori/ImageResponse on the edge runtime; jsdom cannot execute it.
        "src/app/opengraph-image.tsx",
      ],
      reporter: ["text", "json-summary"],
      // Reached 100/98/100/95 on 2026-09-30 (stable over 3 runs); gate at 2 points below.
      thresholds: { lines: 98, statements: 96, functions: 98, branches: 93 },
    },
  },
});
