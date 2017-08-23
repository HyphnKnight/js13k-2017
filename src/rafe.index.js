import { createRectangle, getRectanglePoints } from './lib/geometry/index';
import { mapList, addList } from './lib/vector/index';
import { viewWidth, viewHeight } from './dom.js';
import { render, palette } from './graphics/index';
import { perspective } from './graphics/perspective';
import { mkTree, mkTreeAlt, mkCloud } from './graphics/sprite';
import { tree, treeAlt, avenger, cloud, mountain } from './graphics/emoji';

let dt = 0;
let t = 0;

console.log(viewHeight, viewWidth);
const groundPlane = createRectangle([0, 1600 / 2], 0, 10000, 1600);
const windowRect = createRectangle([0, 0], 0, viewWidth * 2, viewHeight * 2);

const { fillText, fillPolygon, strokePolygon, fillArc } = palette;
const getX = () => Date.now() % 6000 / 20 - 150;
const getY = () => 120;
const getZ = () => Date.now() % 6000 / 30 - 20;//200;
const getCamera = () => ([getX(), getY(), getZ()]);

const groundGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, `#5E8C6A`);
groundGradient.addColorStop(1, `#BFB35A`);

const skyGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#69D2E7`);
skyGradient.addColorStop(1, `#A7DBD8`);

// Generate Trees
const objects = [];
let i = 1000;
while (--i > 0) {
  objects.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

i = 25;
while (--i > 0) {
  objects.push(mkCloud([
    Math.random() * 10000 - 5000,
    Math.random() * 1000 + 3500,
  ], Math.random() * 30 + 10));
}

requestAnimationFrame(function main() {
  dt = Math.min(16, Date.now() - t);

  // Game Logic

  // Render Graphics
  palette.clear();
  const calcScreenPosition = perspective(getCamera());

  fillPolygon(
    skyGradient,
    [0, 0],
    windowRect.points,
  );

  fillPolygon(
    groundGradient,
    [0, 0],
    mapList(
      addList(groundPlane.points, groundPlane.position),
      calcScreenPosition,
    ),
  );

  [...objects]
    .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji]) => fillText({}, [x, y - z], emoji));

  fillText({ font: `16px` }, calcScreenPosition([20, 20]), avenger);

  // Render UI
  render();


  t = Date.now();
  requestAnimationFrame(main);
});
