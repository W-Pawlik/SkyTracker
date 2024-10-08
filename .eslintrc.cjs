module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.eslint.json",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",

    "react/jsx-filename-extension": [0, { extensions: [".tsx", ".jsx"] }],
    quotes: ["off"],
    "import/extensions": [0],
  },
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts"],
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
};
