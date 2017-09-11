import config from './rollup.config.base.js';
import minify from 'rollup-plugin-babel-minify';

config.plugins.push(minify({
  comments: false,
  removeConsole: true,
  removeDebugger: true,
  removeUndefined: true,
}));

export default config;
