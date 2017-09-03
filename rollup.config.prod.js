import includePaths from 'rollup-plugin-includepaths';
import resolve from 'rollup-plugin-node-resolve';
import analyze from 'rollup-analyzer-plugin';

export default {
  name: `Alter`,
  input: `src/index.js`,
  output: {
    file: `docs/script.js`,
    format: `iife`
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
