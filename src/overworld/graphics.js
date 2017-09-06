import { createRectangle, getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, addListSet, scaleList } from 'pura/vector/tuple';
import { firstValues } from 'pura/array';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval, ctx } from 'pura/canvas/tuple';
import { calcScreenPosition, calcScreenPosition2d } from 'camera';
import { perspective } from 'perspective';
import { viewWidth, viewHeight } from 'dom';

export const graphics = [];

const groundPlanePoints = mapListSet(
  addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
  calcScreenPosition2d,
);

// Colors
// ocean
const baseOcean = `#69D2E7`;
const lightOcean = `#A7DBD8`;
const beachOcean = `#E0E4CC`;
// ground
const sand = `#CFB590`;
const lightGrass = `#758918`;
const darkGrass = `#9E9A41`;
const lightBrown = `#49281F`;
const darkBrown = `#564334`;

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, lightGrass);
groundGradient.addColorStop(1, darkGrass);

// const skyGradient = ctx.createLinearGradient(0, 0, 50, 50);
// skyGradient.addColorStop(0, `#F8B195`);
// skyGradient.addColorStop(1, `#C06C84`);

// Island Geometry
const islandRadius = 200;
const islandPoints = getRectanglePoints(islandRadius, islandRadius);
const islandOffset = islandRadius;
const calcIslandPoints =
  (scale = 1) =>
    mapListSet(
      addListSet(scaleList(islandPoints, scale), [0, islandOffset]),
      calcScreenPosition2d,
    );


export const render = dt => {
  // Background
  // fillRectangle(
  //   skyGradient,
  //   [0, 0],
  //   viewWidth * 2,
  //   viewHeight,
  //   0,
  // );

  fillPolygon(
    baseOcean,
    [0, 0],
    groundPlanePoints,
  );

  const waveScaleFactor = Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;

  fillOval(
    sand,
    [0, 0],
    calcIslandPoints(1.15 - waveScaleFactor),
  );

  fillOval(
    groundGradient,
    [0, 0],
    calcIslandPoints(1),
  );

  strokeOval(
    { style: lightOcean, thickness: 3 },
    [0, 0],
    calcIslandPoints(1.15 - waveScaleFactor),
  );

  // Dynamic
  graphics
    .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji, size]) => {
      fillText({ font: `${Math.floor(12 * size * (1 - 2 * (d - 10994) / 8248748))}px monospace` }, [x, y - z], emoji)
    });

};
