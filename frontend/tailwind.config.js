module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Blue for buttons and accents
        secondary: '#1f2937', // Dark gray for headers
        danger: '#ef4444', // Red for low stock
      },
    },
  },
  plugins: [],
};