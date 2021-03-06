import includePaths from 'rollup-plugin-includepaths';
import resolve from 'rollup-plugin-node-resolve';
import analyze from 'rollup-analyzer-plugin';

export default {
  name: `Alter`,
  input: `src/index.js`,
  output: {
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
    resolve(),
    analyze()
  ],
};
