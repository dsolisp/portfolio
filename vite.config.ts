import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (dsolisp.is-a.dev) serves from root, so base stays '/'.
export default defineConfig({
  plugins: [react()],
})
