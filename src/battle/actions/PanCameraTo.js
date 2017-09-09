import { add } from 'pura/vector/tuple';
import { camera } from 'camera';
import { moveCharacter, cameraOffset, } from 'battle/grid';

export default function* PanCameraTo(target) {
  const animateTo = moveCharacter(camera, add(cameraOffset, target), 2000);
  while(!animateTo()) yield;
}
