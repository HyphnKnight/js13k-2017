import includePaths from 'rollup-plugin-includepaths';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import analyze from 'rollup-analyzer-plugin';

export default {
  name: `Alter`,
  input: `src/index.js`,
  output: {
    file: `docs/script.js`,
    format: `iife`,
    sourcemap: false
  },

  plugins: [
    includePaths({
      include: {},
      paths: [`src`],
      external: [],
      extensions: [`.js`]
    }),
    cjs({
      sourceMap: false
    }),
    resolve(),
    analyze()
  ],
};
