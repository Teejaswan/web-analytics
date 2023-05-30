import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'Counter',
      fileName: 'counter'
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    }
  }
})
