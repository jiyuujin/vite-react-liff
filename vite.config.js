import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  root: './src',
  build: {
    outDir: '../out',
    emptyOutDir: true
  },
  plugins: [react()]
})
