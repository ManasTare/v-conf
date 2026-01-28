import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          if (path.startsWith('/api/auth') || path.startsWith('/api/vehicle')) {
            return path.replace(/^\/api/, '');
          }
          return path;
        }
      }
    }
  }
})
