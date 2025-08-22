import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Add if using React

export default defineConfig({
  plugins: [react()], // Include if using React
  build: {
    rollupOptions: {
      external: ['react', 'react-chartjs-2', 'react-dom', 'pages'],
    },
  },
});
