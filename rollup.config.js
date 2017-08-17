import serve from 'rollup-plugin-serve';

export default {
  entry: `src/index.js`,
  dest: `docs/script.js`,

  plugins: [
    serve({
      open: true,
      contentBase: `docs`,
    })
  ],

  format: `iife`
};
