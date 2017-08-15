import { renderUI } from '../lib/cEl/index.js';
import { createRectangle } from '../lib/geometry/index';

import { Menu } from './menu.js';
import { Cursor } from './cursor.js';

const canvas = document.querySelector('canvas');
canvas.width = 320;
canvas.height = 240;

const { palette, render } = renderUI(canvas, {
  geometry: createRectangle([0, 0], 0, window.innerWidth, window.innerHeight),
  children: [Menu, Cursor],
});

palette.ctx.imageSmoothingEnabled = false;

export { palette, render };
