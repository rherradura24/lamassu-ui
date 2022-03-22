module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:eqeqeq-fix/recommended",
    "standard"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "unused-imports"
  ],
  rules: {
    quotes: [
      "error",
      "double"
    ],
    "unused-imports/no-unused-imports": "error",
    "no-use-before-define": "off",

    // To Be romoved over time
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "no-template-curly-in-string": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
