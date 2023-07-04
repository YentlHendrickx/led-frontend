/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#222831',
        'secondary': '#393E46',
        'accent': '#00ADB5',
        'primary-text': '#DDDDDD',
        'primary-text-hover': '#AAAAAA',
      },
    },
  },
  plugins: [],
}

