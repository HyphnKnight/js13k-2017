import { createRectangle, getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, addListSet } from 'pura/vector/tuple';
import { firstValues } from 'pura/array';
import { fillPolygon, fillRectangle, fillText, ctx } from 'pura/canvas/tuple';
import { calcScreenPosition } from 'camera';
import { perspective } from 'perspective';
import { viewWidth, viewHeight } from 'dom';

export const graphics = [];

const groundPlanePoints = mapListSet(
  addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
  pnt => firstValues(calcScreenPosition(pnt), 2),
);

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, `#5E8C6A`);
groundGradient.addColorStop(1, `#BFB35A`);

const skyGradient = ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#69D2E7`);
skyGradient.addColorStop(1, `#A7DBD8`);

export const render = dt => {
  // Background
  fillRectangle(
    skyGradient,
    [0, 0],
    viewWidth * 2,
    viewHeight,
    0,
  );

  fillPolygon(
    groundGradient,
    [0, 0],
    groundPlanePoints,
  );

  // Dynamic
  graphics
    .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji]) => fillText({}, [x, y - z], emoji));

};
