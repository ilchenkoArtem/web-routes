import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: './main.ts',
  },

  format: ['esm', 'cjs'],
  splitting: false,
  minify: true,
  sourcemap: true,
  clean: true,
  dts: true,
});
