import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: [
      "src/**/*.{ts,tsx}"
    ],
    rules: {
      indent: ["error", 2], // インデントを2スペースにする
      semi: ["error", "always"] // セミコロンを必ずつける
    },
    ignores: [
      "node_modules",
      "dist",
      "*.config.js",
      "!eslint.config.js"
    ],
    plugins: { js },
    languageOptions: {  globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
