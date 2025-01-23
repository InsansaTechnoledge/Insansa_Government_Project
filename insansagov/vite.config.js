import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compress from 'vite-plugin-compress';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // compress({
    //   brotli: true,   // Enable Brotli compression
    //   gzip: true,     // Enable Gzip compression
    // }),
  ],
});
