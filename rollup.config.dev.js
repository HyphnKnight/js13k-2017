import serve from 'rollup-plugin-serve';
import config from './rollup.config.prod.js';

config.output.file = `dev/script.js`;

config.plugins.push(serve({
  open: true,
  contentBase: `dev`,
}));

export default config;
