import { set, add } from 'pura/vector/tuple';
import { camera } from '../../camera.js';
import {
  cameraOffset,
  getVector2dFromHex,
  moveCharacter,
} from '../grid.js';

export default function* MoveCharacterOnPath(position, path) {
  let i = -1;
  while(++i < path.length) {
    const targetPosition = getVector2dFromHex(path[i]);
    const runCharacter = moveCharacter(position, targetPosition, 500);
    while(!runCharacter()) {
      set(camera, ...add(cameraOffset, position));
      yield;
    }
  }
}
