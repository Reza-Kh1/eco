/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
const tailwind = withMT({
  darkMode: ["class"],
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "span-light": "#4a4d50",
        "span-dark": "#c8c8c8",
        "tag-head-dark": "#c8c8c8",
        "tag-head-light": "#292929",
        "p-light": "#c8c8c8",
        "p-dark": "#bababa",
      }
    }
  },
  plugins: []
})
export default tailwind