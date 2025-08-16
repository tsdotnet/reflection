import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: [
      "dist/",
      "dist-esm/",
      "docs/",
      "tests/",
      "node_modules/"
    ]
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];
