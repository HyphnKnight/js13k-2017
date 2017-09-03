import serve from 'rollup-plugin-serve';
import config from './rollup.config.prod.js';

config.output.file = `dev/script.js`;

// Remove bundle analyzer.
config.plugins.pop();

// Add dev server.
config.plugins.push(serve({
  open: true,
  contentBase: `dev`,
}));

export default config;
