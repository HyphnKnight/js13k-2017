import { renderUI } from 'lib/cEl';
import { createRectangle } from 'lib/geometry';

import { Menu } from 'title';
import { Dialog } from 'dialog';

import { canvas } from 'dom';

const { palette, render } = renderUI(canvas, {
  geometry: createRectangle([0, 0], 0, window.innerWidth, window.innerHeight),
  children: [Dialog],
});

palette.ctx.imageSmoothingEnabled = false;

export { palette, render };
