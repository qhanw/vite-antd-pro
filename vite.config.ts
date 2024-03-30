import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';

// import { vitePluginFakeServer } from "vite-plugin-fake-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { proxy: { '^/api': { target: 'http://10.80.10.95:9001', changeOrigin: true } } },
});
