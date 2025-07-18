/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  trailingComma: "es5",
  arrowParens: "avoid",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  proseWrap: "always",
  endOfLine: "lf",
};
