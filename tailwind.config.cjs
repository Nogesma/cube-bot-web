module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  themes: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["fantasy", "dark"],
  },
};
