import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: split vendor code
          react: ['react', 'react-dom'],
        },
      },
      // You can also mark externals here if needed
      // external: ['react-chartjs-2', 'chart.js']
    },
  },
});
