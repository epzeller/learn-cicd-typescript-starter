import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config"; // The official helper

export default defineConfig([
  // 1. Ignore folders you don't want to lint (like coverage or build output)
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**"]
  },

  // 2. Load the base recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Define your project environment and custom rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.node,    // Fixes the 'process is not defined' error
        ...globals.browser, // Keeps browser globals if you need them
      },
    },
    rules: {
      // Force 'unused variables' to show up as errors
      "@typescript-eslint/no-unused-vars": "error",
      "no-unused-vars": "off", // Turn off base rule to avoid duplicate warnings
    },
  },
]);