import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, addListSet, scaleList } from 'pura/vector/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval, ctx } from 'pura/canvas/tuple';
import { perspective, perspective2d } from 'camera';
import { viewWidth, viewHeight } from 'dom';
import state from 'state';
import {
  makeAvengerPool,
  makeChildPool,
  makeProtectionPool,
  makePersecutorPool,
  makeOriginalPool,
  makeEvilPool,
} from 'overworld/pools';

export const graphics = [];

const groundPlanePoints = mapListSet(
  addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
  perspective2d,
);

// Colors
// ocean
const baseOcean = `#69D2E7`;
const lightOcean = `#A7DBD8`;
// const beachOcean = `#E0E4CC`;
// ground
const sand = `#CFB590`;
const lightGrass = `#9E9A41`;
const darkGrass = `#758918`;
// const lightBrown = `#49281F`;
// const darkBrown = `#564334`;

// sky
const skyBlue = `#CCF3FF`;

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, lightGrass);
groundGradient.addColorStop(1, darkGrass);

// const skyGradient = ctx.createLinearGradient(0, 0, 50, 50);
// skyGradient.addColorStop(0, `#F8B195`);
// skyGradient.addColorStop(1, `#C06C84`);

// Island Geometry
const islandRadius = 1000;
const islandPoints = getRectanglePoints(islandRadius, islandRadius);
export const islandOffset = islandRadius;
const calcIslandPoints =
  (scale = 1) =>
    mapListSet(
      addListSet(scaleList(islandPoints, scale), [0, islandOffset]),
      perspective2d,
    );

const avengerPool = makeAvengerPool(50, [0, 100], () => { });
const childPool = makeChildPool(50, [75, 100], () => { });
const protectionPool = makeProtectionPool(50, [150, 100], () => { });
const persecutorPool = makePersecutorPool(50, [225, 100], () => { });
const originalPool = makeOriginalPool(50, [300, 100], () => { });
const evilPool = makeEvilPool(50, [375, 100], () => { });

export const render = () => {
  // Background
  fillRectangle(
    skyBlue,
    [0, 0],
    viewWidth * 2,
    viewHeight * 2,
    0,
  );

  fillPolygon(
    baseOcean,
    [0, 0],
    groundPlanePoints,
  );

  const waveScaleFactor = Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;
  const adjustedWavePoints = calcIslandPoints(1.15 - waveScaleFactor);
  fillOval(
    sand,
    [0, 0],
    adjustedWavePoints,
  );

  strokeOval(
    { style: lightOcean, thickness: 5 },
    [0, 0],
    adjustedWavePoints,
  );

  fillOval(
    groundGradient,
    [0, 0],
    calcIslandPoints(1),
  );

  avengerPool.render();
  avengerPool.collision(state.position);
  childPool.render();
  childPool.collision(state.position);
  protectionPool.render();
  protectionPool.collision(state.position);
  persecutorPool.render();
  persecutorPool.collision(state.position);
  originalPool.render();
  originalPool.collision(state.position);
  evilPool.render();
  evilPool.collision(state.position);

  // Dynamic
  graphics
    .map(point => [...perspective(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji, size]) => fillText(
      { font: `${Math.floor(12 * size * (1 - 2 * (d - 10994) / 8248748))}px monospace` },
      [x, y - z],
      emoji
    ));

};
