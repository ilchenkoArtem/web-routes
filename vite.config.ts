import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'my-lib',
      fileName: 'my-lib',
    },
  },
  test: { environment: 'jsdom' },
  define: process.env.VITEST ? {} : { global: 'window' },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
}));
