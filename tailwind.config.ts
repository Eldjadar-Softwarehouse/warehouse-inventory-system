import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary
        "sage": "#2B4BF2",
        "black": "#1A1A1A",

        // Hover
        "blue-hv": "#84AEFF",

        // Secondary
        "orange": "#FF9500",
        "red": "#FF564F",
        "gray-1": "#8E8E93",
        "gray-2": "##AEAEB2",
        "gray-3": "#C7C7CC",
        "gray-4": "#D1D1D6",
        "gray-5": "#E5E5EA",
        "gray-6": "#F2F2F7",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
