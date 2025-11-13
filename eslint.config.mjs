import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],
    plugins: { js },
    extends: ["js:recommended"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    }
  },
  {
    files: ["**/*.jsx"],
    plugins: { react: pluginReact },
    rules: {
      ...pluginReact.configs.recommended.rules
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      react: { version: "detect" }
    }
  }
]);

// ...existing code...
