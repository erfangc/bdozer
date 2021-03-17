const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    './**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
    colors,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
