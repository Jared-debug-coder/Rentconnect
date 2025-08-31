import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    open: false,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'development' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/Rentconnect/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          router: ['react-router-dom'],
          icons: ['lucide-react', '@mui/icons-material'],
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    // Enable source maps for debugging but keep them separate
    sourcemap: mode === 'development',
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  },
}));
