import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages user site (dsolisp.github.io) serves from root, so base stays '/'.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
