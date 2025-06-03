import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'coverage'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
