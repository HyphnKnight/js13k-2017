import { scaleToSet, add, addSet, set, subtract, magnitude, magnitudeSqr } from 'pura/vector/tuple';
import { sign } from 'pura/math';
import state from 'state';
import { avngSprite, chldSprite, protSprite, persSprite, gemSprite, isOnIsland } from 'overworld/graphics';
import { camera } from 'camera';
import { inputs, keyboardVector } from 'controls';
import { viewWidth } from 'dom';

const charSpeed = () => inputs.space ? 6 : 3;

const follow =
  (sprite, distance) => {
    const relativePos = subtract(state.position, sprite);
    if(magnitude(relativePos) > distance) {
      addSet(sprite, scaleToSet(relativePos, charSpeed()));
    }
  };

const characterControls = keyboardVector(1);

export default () => {
  // TODO: USE KEYBOARD VECTOR
  // Character Controls
  let movement;
  if(state.target !== null) {
    const diff = subtract(state.target, state.position);
    if(magnitudeSqr(diff) < 3) state.target = null;
    movement = scaleToSet(diff, charSpeed());
  } else {
    movement = scaleToSet(characterControls(), charSpeed());
  }

  const newPosition = add(state.position, movement);
  if(isOnIsland(newPosition)) set(state.position, ...newPosition);

  set(avngSprite, ...state.position);
  follow(protSprite, 20 + Date.now() % 300 / 30);
  follow(chldSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(gemSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  set(camera, ...add(state.position, [0, -100]));
};
