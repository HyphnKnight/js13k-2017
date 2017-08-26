import resolve from 'rollup-plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';

export default {
  input: `src/index.js`,
  output: {
    file: `docs/script.js`,
    format: `iife`
  },

  plugins: [
    includePaths({
      include: {},
      paths: [`src/lib`, `src`],
      external: [],
      extensions: [`.js`]
    }),
    resolve(),
  ],
};