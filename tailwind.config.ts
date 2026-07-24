import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050507",
        "ink-soft": "#0d0e12",
        bone: "#f3eee2",
        ember: "#ff9f1c",
        aqua: "#68e1fd",
        violet: "#8f7aff",
      },
      fontFamily: {
        display: [
          "Inter",
          "SF Pro Display",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "SF Pro Text",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        "portrait-glow": "0 34px 110px rgba(0,0,0,0.7), 0 0 80px rgba(104,225,253,0.18)",
        "nav-glass": "0 18px 70px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
