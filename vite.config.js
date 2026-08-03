import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Honor the port assigned by the launcher (e.g. preview tooling); fall back to Vite's default.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: !!process.env.PORT,
  },
  preview: {
    // Same deal for `vite preview`, which is how the built /en/ page gets checked.
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    strictPort: !!process.env.PORT,
  },
})
