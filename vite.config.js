import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: process.env.BASE_URL || (command === 'serve' ? '/' : '/ananta-vijaya/'),
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
}))
