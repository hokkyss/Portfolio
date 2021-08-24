module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    width: {
      content: "100vw",
    },
    height: {
      content: "90vh",
    },
    fontSize: {
      small: "1.025vw", // 14px in 1366px width
      normal: "1.46vw", // 20px in 1366px width
      big: "2.21vw", // 30px in 1366px width
      heading: "2.93vw", // 40px in 1366px width
    },
    fontWeight: {
      heading: 800,
    },
    letterSpacing: {
      default: "0.06vw",
    },
    color: {
      text: "black",
    },
  },
  variants: {},
  plugins: [],
};
