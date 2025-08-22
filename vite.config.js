import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import svgIcons from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  build: {
    rollupOptions: {
      external: ['react-chartjs-2', 'vite-plugin-svg-icons',], 
    },
  },
});
