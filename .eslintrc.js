// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react-native"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "prettier/prettier": ["error", { trailingComma: "all" }], // Enforce trailing commas
    "react-native/no-unused-styles": "error",
    "comma-dangle": ["error", "always-multiline"], // Match Prettier
  },
};
