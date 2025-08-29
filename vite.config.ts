import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 base: '/weather-app-rau-arbeitsschutz/',
 resolve: {
  alias: {
   '@': path.resolve(__dirname, './src'),
  },
 },
});
