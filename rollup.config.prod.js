// import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';

export default {
  entry: `src/index.js`,
  dest: `docs/script.js`,

  plugins: [
    includePaths({
      include: {},
      paths: [`src/lib`, `src`],
      external: [],
      extensions: [`.js`]
    }),
    resolve(),
  ],

  format: `iife`
};
