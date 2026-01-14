import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/application': {
        target: 'https://swuweb-website-production.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
