import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // 🔥 THIS FIXES ANTD CONFLICT
  },
})
