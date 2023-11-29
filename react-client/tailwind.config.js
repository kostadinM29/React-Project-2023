/** @type {import('tailwindcss').Config} */
export default {
  blocklist: [
    'rti--container',
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

