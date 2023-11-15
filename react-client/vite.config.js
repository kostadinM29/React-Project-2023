import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    [
      react(),
      svgr(),
      viteBasicSslPlugin(),
    ],
})
