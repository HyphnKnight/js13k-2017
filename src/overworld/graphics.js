import { addSet, rotateSet, scaleSet } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, addListSet, scaleList } from 'pura/vector/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval, ctx } from 'pura/canvas/tuple';
import { perspective, perspective2d } from 'camera';
import { viewWidth, viewHeight } from 'dom';
import state from 'state';
import {
  mkTree,
  mkTreeAlt,
  mkAvenger,
  mkChild,
  mkProtector,
  mkPersecutor,
  mkGem,
  mkMountain,
} from 'sprite';
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

// Characters.
export const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

graphics.push(avngSprite, chldSprite, protSprite, persSprite, gemSprite);

// Pools.
const pools = [
  makeAvengerPool(50, [0, 600], () => { }),
  makeChildPool(50, [75, 600], () => { }),
  makeProtectionPool(50, [150, 600], () => { }),
  makePersecutorPool(50, [225, 600], () => { }),
  makeOriginalPool(50, [300, 600], () => { }),
  makeEvilPool(50, [375, 600], () => { })
];

// Island props.
const maxProps = 100;

const props = new Map([
  [mkTree, 1],
  [mkTreeAlt, 1],
  [mkMountain, 0.1],
]);

let i = 0;
while(++i < maxProps) {
  for(const [prop, amount] of props) {
    if(i < maxProps*amount) {
      const pos = addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]);

      for(const pool of pools) {
        while(pool.collision(pos)) {
          pos[1]++;
        }
      }

      graphics.push(
        prop(
          pos, 0
        )
      );
    }
  }
}

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;
// ground
const sand = `#CFB590`;

// sky
const skyBlue = `#CCF3FF`;

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
[
  `#e8e85c`,
  `#646410`
].map((stop, index, colors)=> {
  groundGradient.addColorStop(index/colors.length, stop);
});

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
    { style: seaFoam, thickness: 5 },
    [0, 0],
    adjustedWavePoints,
  );

  fillOval(
    groundGradient,
    [0, 0],
    calcIslandPoints(1),
  );

  for(const pool of pools) {
    pool.render();
    pool.testCallback(state.position);
  }

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
