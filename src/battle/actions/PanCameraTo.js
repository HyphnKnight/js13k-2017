import { add } from 'pura/vector/tuple';
import { camera } from '../../camera.js';
import { moveCharacter, cameraOffset, } from '../grid.js';

export default function* PanCameraTo(target) {
  const animateTo = moveCharacter(camera, add(cameraOffset, target), 2000);
  while(!animateTo()) yield;
}
