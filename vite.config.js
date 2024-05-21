import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  coverage: {
    provider: 'istanbul'
  },
  environment: 'happy-dom',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});