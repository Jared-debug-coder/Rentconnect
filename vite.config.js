import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Rentconnect/', // Base URL for GitHub Pages - note case sensitivity
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    // Add explicit asset handling
    assetsInlineLimit: 0,
    manifest: true,
    // Ensure proper path handling
    cssCodeSplit: true,
  },
  publicDir: 'public',
})
