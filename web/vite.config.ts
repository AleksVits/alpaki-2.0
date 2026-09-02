import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/alpaki-2.0/' : '/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
}))
