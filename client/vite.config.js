import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    
    historyApiFallback: {
      index: '/index.html',  // Ensure that this points to the right location for the fallback
    },
  },
  plugins: [react()],
  base: '/',  // Ensures correct paths for built files, useful for relative paths in production
  build: {
    outDir: 'dist',  // Ensures build output is in 'dist/'
  },
});