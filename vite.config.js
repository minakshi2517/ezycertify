import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import paymentApiPlugin from './server/vitePlugin.js'

export default defineConfig({
  plugins: [react(), paymentApiPlugin()],
  server: {
    port: 5174,
  },
})
