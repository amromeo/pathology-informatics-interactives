import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import a11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["pages-dist/**", "node_modules/**", "src/generated/**", "review/**"] },
  {
    files: ["src/**/*.{ts,tsx}", "content/**/*.ts", "tests/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "react-hooks": hooks, "jsx-a11y": a11y },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
    },
  },
];
