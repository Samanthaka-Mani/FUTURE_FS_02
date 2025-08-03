import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: parseInt(process.env.PORT) || 4173, // use Render's port or default to 4173
    allowedHosts: ['mini-ecommerce-store-alhc.onrender.com']
  }
})
