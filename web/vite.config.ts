import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

function copyToDocs(): Plugin {
  return {
    name: 'copy-to-docs',
    closeBundle() {
      const dest = resolve(root, '../docs')
      rmSync(dest, { recursive: true, force: true })
      mkdirSync(dest, { recursive: true })
      cpSync(resolve(root, 'dist'), dest, { recursive: true })
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react(), copyToDocs()],
  base: command === 'build' ? '/alpaki-2.0/' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}))
