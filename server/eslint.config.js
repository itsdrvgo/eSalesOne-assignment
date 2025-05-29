import js from "@eslint/js";
import drizzle from "eslint-plugin-drizzle";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        plugins: {
            "unused-imports": unusedImports,
            drizzle,
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: { js },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: { globals: globals.node },
    },
    tseslint.configs.recommended,
    {
        rules: {
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "off",
            "no-unused-vars": ["off", "always"],
            quotes: ["error", "double"],
            eqeqeq: ["error", "always"],
            "drizzle/enforce-delete-with-where": "error",
            "drizzle/enforce-update-with-where": "error",
            "comma-spacing": [
                "error",
                {
                    before: false,
                    after: true,
                },
            ],
            "keyword-spacing": [
                "error",
                {
                    before: true,
                    after: true,
                },
            ],
            "object-curly-spacing": ["error", "always"],
            "arrow-parens": ["error", "always"],
            "no-trailing-spaces": ["error", {}],
            "no-multi-spaces": ["error", {}],
            "semi-spacing": [
                "error",
                {
                    before: false,
                    after: true,
                },
            ],
        },
        ignores: ["**/node_modules/**", "**/build/**"],
    },
]);
