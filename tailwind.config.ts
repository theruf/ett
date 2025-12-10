import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Бело-серая палитра ÉTT Market
        white: "#FFFFFF",
        "gray-lightest": "#F7F7F7",
        "gray-light": "#EDEDED",
        "gray-text": "#9A9A9A",
        "gray-dark": "#111111",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
