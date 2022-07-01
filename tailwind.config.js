const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.ts",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "gray-bg": "#f7f8fc",
        accent: "#075133",
        "accent-dark": "#055132",
      },
    },
  },
  plugins: [],
};
