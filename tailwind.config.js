/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"', 'sans-serif'], // Inter font
        'futura': ['"Futura TS New"', 'sans-serif'], // Futura font
        'roboto': ['"Roboto"', 'sans-serif'], // Roboto font
        'poppins': ['"Poppins"', 'sans-serif'], // Poppins font
        'montserrat': ['"Montserrat"', 'sans-serif'], // Montserrat font
      },
      fontSize: {
        'section-three-lg': '61.42px', // Custom large font size
        'xl-title': '32px', // Example title size
        'lg-title': '24px', // Example large title size
        'base-text': '16px', // Base text size
        'sm-text': '14px', // Small text size
      },
      lineHeight: {
        'section-three-line': '76.17px', // Custom line height
        'title-line': '40px', // Title line height
        'text-line': '24px', // Text line height
        'compact-line': '20px', // Compact line height
      },
    },
  },
  plugins: [],
};
