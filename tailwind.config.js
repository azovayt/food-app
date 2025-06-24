/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        NunitoBold: ["Nunito-Bold"],
        NunitoExtraBold: ["Nunito-ExtraBold"],
        NunitoLight: ["Nunito-Light"],
        NunitoMedium: ["Nunito-Medium"],
        NunitoRegular: ["Nunito-Regular"],
        NunitoBlack: ["Nunito-Black"],
      },
    },
  },
  plugins: [],
};
