import { createRectangle } from 'lib/geometry';
import { addList, mapList } from 'lib/vector';
import { palette } from 'ui';
import { calcScreenPosition } from 'camera';
import { perspective } from 'perspective';
import { viewWidth, viewHeight } from 'dom';

export const graphics = [];

const { fillPolygon, fillText, ctx } = palette;

const groundPlane = createRectangle([0, 1600 / 2], 0, 10000, 1600);
const skyPlane = createRectangle([0, 0], 0, viewWidth * 2, viewHeight * 2);

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, `#5E8C6A`);
groundGradient.addColorStop(1, `#BFB35A`);

const skyGradient = ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#69D2E7`);
skyGradient.addColorStop(1, `#A7DBD8`);

export const render = dt => {
  // Background
  fillPolygon(
    skyGradient,
    [0, 0],
    skyPlane.points,
  );
  fillPolygon(
    groundGradient,
    [0, 0],
    mapList(
      addList(groundPlane.points, groundPlane.position),
      calcScreenPosition,
    ),
  );

  // Dynamic
  graphics
    .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji]) => fillText({}, [x, y - z], emoji));

};
