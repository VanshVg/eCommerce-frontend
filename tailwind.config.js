/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        silver: "#e4e4e6",
        white: "#ffffff",
        customDark: "#171717",
        link: "#1434a4",
        red: "#FF0000",
        green: "#027148",
      },
      fontFamily: {
        customFont: ["myFont", "lato"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
};
