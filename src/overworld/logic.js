import { scaleToSet, add, addSet, set, subtract, magnitude, magnitudeSqr } from 'pura/vector/tuple';
import { sign } from 'pura/math';
import state from 'state';
import { avngSprite, chldSprite, protSprite, persSprite, gemSprite, isOnIsland } from 'overworld/graphics';
import { camera } from 'camera';
import { inputs } from 'controls';
import { viewWidth } from 'dom';

const direction = [0, 0];
const charSpeed = () => inputs.space || inputs.shift ? 6 : 3;

const follow =
  (sprite, distance) => {
    const relativePos = subtract(state.position, sprite);
    if(magnitude(relativePos) > distance) {
      addSet(sprite, scaleToSet(relativePos, charSpeed()));
    }
  };

export default () => {
  // Character Controls
  direction[0] = 0;
  direction[1] = 0;
  if(!state.dialog.script.length) {
    if(inputs.w || inputs.up || inputs.s || inputs.down || inputs.d || inputs.right || inputs.a || inputs.left) state.target = null;
    if(inputs.w || inputs.up) direction[1] += 1;
    if(inputs.s || inputs.down) direction[1] -= 1;
    if(inputs.d || inputs.right) direction[0] += 1;
    if(inputs.a || inputs.left) direction[0] -= 1;
  }

  const movement = scaleToSet(direction, charSpeed());
  const newPosition = add(state.position, movement);
  if(isOnIsland(newPosition)) {
    set(state.position, ...newPosition);
  }

  if(state.target !== null) {
    const diff = subtract(state.target, state.position);
    if(magnitudeSqr(diff) < 3) { state.target = null }
    addSet(state.position, scaleToSet(diff, charSpeed()));
  }
  avngSprite[0] = state.position[0];
  avngSprite[1] = state.position[1];
  follow(protSprite, 20 + Date.now() % 300 / 30);
  follow(chldSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(gemSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  set(camera, ...add(state.position, [0, -100]));
};
