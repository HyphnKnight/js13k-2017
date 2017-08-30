import serve from 'rollup-plugin-serve';
import resolve from 'rollup-plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';

export default {
  name: `Alter`,
  input: `src/index.js`,
  output: {
    file: `dev/script.js`,
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
    serve({
      open: true,
      contentBase: `dev`,
    })
  ]
};
