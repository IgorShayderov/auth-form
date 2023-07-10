import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@assets/*': ['./src/assets/*'],
      '@classes/*': ['./src/classes/*'],
      '@components/*': ['./src/components/*'],
      '@hooks/*': ['./src/hooks/*'],
    },
  },
});
