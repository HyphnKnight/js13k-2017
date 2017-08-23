import { createRectangle, getRectanglePoints } from './lib/geometry/index';
import { mapList, addList, scaleToSet, addSet, subtract, magnitude } from './lib/vector/index';
import { sign } from './lib/math/index';
import { viewWidth, viewHeight } from './dom.js';
import { render, palette } from './graphics/index';
import { perspective } from './graphics/perspective';
import { mkTree, mkTreeAlt, mkCloud, mkAvenger, mkChild, mkProtector, mkPersecutor, mkPool, mkDiamond } from './graphics/sprite';
import { tree, treeAlt, avenger, cloud, mountain, child, protector, persecutor } from './graphics/emoji';
import { camera } from './graphics/camera';
import { inputs } from './graphics/controls';
import state from './state';

// state.dialog.push(
//   [
//     `I thought what I'd do was, I'd pretend I was one of those deaf-mutes.`,
//     [avenger, `Avenger`],
//   ], [
//     `Of polished desert-quarried marble were its walls, in height 300 cubits and in breadth 75,`,
//     [child, `Child`]
//   ], [
//     `so that chariots might pass each other as men drave them along the top.`,
//     [child, `Child`]
//   ], [
//     `For full 500 stadia did they run, being open only on the side toward the lake;`,
//     [protector, `Protector`]
//   ], [
//     `where a green stone sea-wall kept back the waves that rose oddly once a year`,
//     [protector, `Protector`]
//   ], [
//     `at the festival of the destroying of Ib.`,
//     [protector, `Protector`]
//   ], [
//     `In Sarnath were fifty streets from the lake to the gates of the caravans,`,
//     [persecutor, `Persecutor`]
//   ], [
//     `and fifty more intersecting them.`,
//     [persecutor, `Persecutor`]
//   ]);

let dt = 0;
let t = 0;


const groundPlane = createRectangle([0, 1600 / 2], 0, 10000, 1600);
const windowRect = createRectangle([0, 0], 0, viewWidth * 2, viewHeight * 2);

const { fillText, fillPolygon, strokePolygon, fillArc } = palette;

const groundGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, `#5E8C6A`);
groundGradient.addColorStop(1, `#BFB35A`);

const skyGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#69D2E7`);
skyGradient.addColorStop(1, `#A7DBD8`);

// Generate Trees
const objects = [];
let i = 1000;
while(--i > 0) {
  objects.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

i = 25;
while(--i > 0) {
  objects.push(mkCloud([
    Math.random() * 10000 - 5000,
    Math.random() * 1000 + 3500,
  ], Math.random() * 30 + 10));
}

i = 5;
while(--i > 0) {
  objects.push(mkPool([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

const charSpeed = 3;
const direction = [0, 0];
const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const diamondSprite = mkDiamond([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

const calcFollow = (followPos) => (sprite, distance) => {
  const relativePos = subtract(state.position, sprite);
  if(magnitude(relativePos) > distance) {
    addSet(sprite, scaleToSet(relativePos, charSpeed));
  }
};

objects.push(avngSprite, chldSprite, protSprite, persSprite, diamondSprite);

requestAnimationFrame(function main() {
  dt = Math.min(16, Date.now() - t);
  camera[2] = 40 + (Date.now() % 3000) / 3000 * 120;

  // Game Logic
  direction[0] = 0;
  direction[1] = 0;
  if(inputs.w || inputs.up) {
    direction[1] += 1;
  }
  if(inputs.s || inputs.down) {
    direction[1] -= 1;
  }
  if(inputs.d || inputs.right) {
    direction[0] += 1;
  }
  if(inputs.a || inputs.left) {
    direction[0] -= 1;
  }
  addSet(state.position, scaleToSet(direction, charSpeed));
  state.position[1] = Math.max(state.position[1], 5);
  avngSprite[0] = state.position[0];
  avngSprite[1] = state.position[1];
  const follow = calcFollow(avngSprite);
  follow(chldSprite, 20 + Date.now() % 300 / 30);
  follow(protSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(diamondSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) {
    camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  }

  // Render Graphics
  palette.clear();
  const calcScreenPosition = perspective(camera);

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

  // Render UI
  render();

  t = Date.now();
  requestAnimationFrame(main);
});
