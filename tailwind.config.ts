import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/page_components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-lab": "url('/assets/images/lab.png')",
      },
      colors: {
        blue1: "#316F86",
        blue2: "#017489",
        blue3: "#172048",
        blue4: "#004B88",
        gray: {
          1: " #6D6D6D",
          2: "#7D7987",
          3: "#797979",
          4: "#F5F4F4",
          5: "#E9EAEF",
          6: "#D9D9D9",
        },
        text: {
          black1: "#333",
          black2: "#414141",
          black3: "#111111",
          black4: "#0A142F",
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "0.6" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
