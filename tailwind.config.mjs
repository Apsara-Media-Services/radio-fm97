import { heroui } from "@heroui/react";
import tailwind from './src/configs/tailwind.js';

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
      colors: {
        'ams-primary': tailwind.colors.primary ?? '#cf0a10',
        'ams-secondary': tailwind.colors.secondary ?? '#362095',
        'ams-red': '#cf0a10',
        'ams-blue': '#362095',
        'ams-purple': '#721550',
        'ams-light': '#eeeff0',
      },
      backgroundImage: {
        ...tailwind.backgroundImage,
      },
    },
  },
  plugins: [heroui()],
};
