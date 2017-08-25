import { scaleToSet, addSet, set, subtract, magnitude, mapList } from 'lib/vector';
import { sign } from 'lib/math';
import state from 'state';
import { graphics } from 'overworld/graphics';
import { camera } from 'camera';
import { inputs } from 'controls';
import {
  mkTree,
  mkTreeAlt,
  mkCloud,
  mkAvenger,
  mkChild,
  mkProtector,
  mkPersecutor,
  mkPool,
  mkGem,
} from 'sprite';
import { viewWidth } from 'dom';


const direction = [0, 0];
const charSpeed = 3;

let i = 1000;
while(--i > 0) {
  graphics.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

i = 25;
while(--i > 0) {
  graphics.push(mkCloud([
    Math.random() * 10000 - 5000,
    Math.random() * 1000 + 3500,
  ], Math.random() * 30 + 10));
}

i = 5;
while(--i > 0) {
  graphics.push(mkPool([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

export const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

const calcFollow =
  (followPos) =>
    (sprite, distance) => {
      const relativePos = subtract(state.position, sprite);
      if(magnitude(relativePos) > distance) {
        addSet(sprite, scaleToSet(relativePos, charSpeed));
      }
    };

graphics.push(avngSprite, chldSprite, protSprite, persSprite, gemSprite);

export default () => {

  // Character Controls
  direction[0] = 0;
  direction[1] = 0;
  if(inputs.w || inputs.up) direction[1] += 1;
  if(inputs.s || inputs.down) direction[1] -= 1;
  if(inputs.d || inputs.right) direction[0] += 1;
  if(inputs.a || inputs.left) direction[0] -= 1;
  addSet(state.position, scaleToSet(direction, charSpeed));
  state.position[1] = Math.max(state.position[1], 5);
  avngSprite[0] = state.position[0];
  avngSprite[1] = state.position[1];
  const follow = calcFollow(avngSprite);
  follow(chldSprite, 20 + Date.now() % 300 / 30);
  follow(protSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(gemSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  // console.log(camera[0]);
};
