import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 👈 নতুন Tailwind v4 এর মেইন ইঞ্জিন প্লাগইন

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 প্লাগইন লিস্টে এটি যুক্ত হলো, যা সব কালার ও স্পেসিং একটিভেট করবে
  ],
})