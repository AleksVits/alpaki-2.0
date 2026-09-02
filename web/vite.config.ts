import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? ''
const isUserSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase()
const base = process.env.GITHUB_ACTIONS ? (isUserSite ? '/' : `/${repo}/`) : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
