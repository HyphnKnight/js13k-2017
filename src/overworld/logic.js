import { scaleToSet, add, addSet, subtractSet, rotateSet, scaleSet, set, subtract, magnitude, mapList, magnitudeSqr } from 'pura/vector/tuple';
import { sign } from 'pura/math';
import state from 'state';
import { graphics, islandOffset } from 'overworld/graphics';
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
  mkMountain,
} from 'sprite';
import { viewWidth } from 'dom';
import Scene from 'scene';
import battle from 'battle';


const direction = [0, 0];
const charSpeed = 3;

export const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

const calcFollow =
  (followPos) =>
    (sprite, distance) => {
      const relativePos = subtract(state.position, sprite);
      if (magnitude(relativePos) > distance) {
        addSet(sprite, scaleToSet(relativePos, charSpeed));
      }
    };

graphics.push(avngSprite, chldSprite, protSprite, persSprite, gemSprite);

let i = 0;
while (++i < 100) {
  graphics.push(
    mkTree(addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]), 0)
  );
}
i = 0;
while (++i < 100) {
  graphics.push(
    mkTreeAlt(addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]), 0)
  );
}
i = 0;
while (++i < 10) {
  graphics.push(
    mkMountain(addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]), 0)
  );
}

export default () => {
  // Character Controls
  direction[0] = 0;
  direction[1] = 0;
  if (inputs.w || inputs.up || inputs.s || inputs.down || inputs.d || inputs.right || inputs.a || inputs.left) state.target = null;
  if (inputs.w || inputs.up) direction[1] += 1;
  if (inputs.s || inputs.down) direction[1] -= 1;
  if (inputs.d || inputs.right) direction[0] += 1;
  if (inputs.a || inputs.left) direction[0] -= 1;
  const movement = scaleToSet(direction, charSpeed);
  addSet(state.position, movement);
  if (state.target !== null) {
    const diff = subtract(state.target, state.position);
    if (magnitudeSqr(diff) < 3) { state.target = null }
    addSet(state.position, scaleToSet(diff, charSpeed));
  }
  state.position[1] = Math.max(state.position[1], 5);
  avngSprite[0] = state.position[0];
  avngSprite[1] = state.position[1];
  const follow = calcFollow(avngSprite);
  follow(chldSprite, 20 + Date.now() % 300 / 30);
  follow(protSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(gemSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if (Math.abs(xDiff) > viewWidth * 0.2) camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  set(camera, ...add(state.position, [0, -100]));
};
