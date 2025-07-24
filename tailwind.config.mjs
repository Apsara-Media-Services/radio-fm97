import { heroui } from "@heroui/react";

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ams-red': '#cf0a10',
        'ams-blue': '#362095',
        'ams-purple': '#721550',
        'ams-light': '#eeeff0',
      },
      fontFamily: {
        sans: [
          'Roboto',
          'KantumruyPro',
          'system-ui',
          '-apple-system',
          'Helvetica Neue',
          'Noto Sans',
          'serif',
        ],
      },
    },
  },
  plugins: [heroui()],
};
