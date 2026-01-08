/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        primary: '#fafafa', 
        secondary: '#27272a',
        muted: '#71717a',
        destructive: '#7f1d1d',
        card: '#18181b', // light zinc
        border: '#27272a',
      },
      fontFamily: {
        sans: ['System'], // Default system font for now
        mono: ['System'],
      }
    },
  },
  plugins: [],
}
