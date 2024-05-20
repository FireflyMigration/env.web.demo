import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/dataApi': 'http://localhost:56557',
      '/home': 'http://localhost:56557',
    },
  },
  build: { outDir: '../mvc/frontend-dist-files' },
})
