import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/nested-routes/index.ts')],
      formats: ['es'],
      name: '@routes',
      fileName: 'index',
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 2,
    sourcemap: true,
    emptyOutDir: true,
  },
  test: { environment: 'jsdom' },
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: ['**/tests/**', '**/tests-d/**'],
    }),
  ],
});
