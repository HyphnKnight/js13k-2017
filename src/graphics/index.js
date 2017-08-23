import { renderUI } from '../lib/cEl/index.js';
import { createRectangle } from '../lib/geometry/index';

import { Menu } from './menu.js';
import { Dialog } from './dialog.js';

import { canvas } from '../dom.js';

const { palette, render } = renderUI(canvas, {
  geometry: createRectangle([0, 0], 0, window.innerWidth, window.innerHeight),
  children: [Dialog],
});

palette.ctx.imageSmoothingEnabled = false;

export { palette, render };
