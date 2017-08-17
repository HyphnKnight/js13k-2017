import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
