import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

// eslint-plugin-react's version "detect" calls context.getFilename(), which
// ESLint 10 removed, so read the installed React version directly instead.
const reactVersion = createRequire(import.meta.url)("react/package.json").version;

export default defineConfig([
  globalIgnores(["build/**", "docs/**", "coverage/**"]),

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },

  pluginReact.configs.flat.recommended,
  reactHooks.configs.flat.recommended,

  {
    // React 17+ JSX transform: React need not be in scope, and prop-types
    // are not used anywhere in this codebase.
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: { react: { version: "detect" } },
  },

  {
    // Node context, not browser.
    files: ["vite.config.js", "eslint.config.mjs"],
    languageOptions: { globals: globals.node },
  },

  {
    // Vitest injects describe/it/expect/vi as globals (test.globals = true).
    files: ["**/*.test.{js,jsx}", "src/setupTests.js"],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
]);
