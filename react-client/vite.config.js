import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173,
    https: true,
  },
  plugins:
    [
      react(),
      viteBasicSslPlugin(),
    ],
})
