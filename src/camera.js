import { viewWidth, viewHeight } from 'dom';
import { addSet, subtract } from 'pura/vector/tuple';
import { keyboardVector } from 'controls';

export let focalLength = 500;
export const camera = [0, 0, 240];

export const perspective =
  // 2d point in world space
  (point) => {
    const [pX, pY] = subtract(point, camera);
    const cZ = camera[2];
    const relPos = (pY + focalLength);
    let sX = pX + pY * -pX / (pY + focalLength) + viewWidth / 2;
    let sY;
    if(relPos < 0) {
      sY = viewHeight + cZ * pY / relPos;
      sX = pX;
    } else if(relPos > 0) {
      sY = viewHeight - cZ * pY / relPos;
    } else {
      sY = viewHeight;
      sX = pX;
    }
    return [sX, sY, Math.pow(focalLength + pY, 2) + Math.pow(-pX, 2)];
  };

export const perspective2d =
  (vector) =>
    perspective(vector).slice(0, 2);

export const calcWorldPosition =
  ([sX, sY]) => {
    const cZ = camera[2];
    const pY = focalLength / (-cZ / (sY - viewHeight) - 1);
    const pX = -((viewWidth * pY) + (viewWidth * focalLength) + (-2 * sX * pY) + (-2 * sX * focalLength)) / (2 * focalLength);
    return addSet([pX, pY], camera);
  };

const getKeyboardVector = keyboardVector(3);

export const controlCamera = () => addSet(camera, getKeyboardVector());
