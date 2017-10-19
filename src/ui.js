import { renderUI } from 'pura/cEl';
import { createRectangle, getRectanglePoints } from 'pura/geometry/tuple';

import { canvas } from './dom.js';

export const uiElements = [];

export const clearUi = () => { while(uiElements.length) uiElements.pop(); };

export const render = renderUI(canvas, {
  geometry: createRectangle([canvas.width / 2, canvas.height / 2], 0, canvas.width, canvas.height),
  children: uiElements,
  render({ geometry }) {
    geometry.position[0] = canvas.width / 2;
    geometry.position[1] = canvas.height / 2;
    geometry.width = canvas.width;
    geometry.height = canvas.height;
    geometry.points = getRectanglePoints(geometry.width, geometry.height);
  },
});
