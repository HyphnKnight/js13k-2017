import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: `src/index.js`,
  dest: `docs/script.js`,

  plugins: [
    resolve(),
    serve({
      open: true,
      contentBase: `docs`,
    })
  ],

  format: `iife`
};
