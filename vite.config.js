import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import '@testing-library/jest-dom/vitest'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
  },
})

