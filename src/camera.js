import { viewWidth, viewHeight } from 'dom';
import { subtract } from 'pura/vector/tuple';

export let focalLength = 80;
export const camera = [0, 0, 140];

export const perspective =
  // 2d point in world space
  (point) => {
    const [pX, pY] = subtract(point, camera);
    const [_x, _y, cZ] = camera;
    const relPos = (pY + focalLength);
    const sX = pX + pY * (0 - pX) / (pY + focalLength) - 0 + viewWidth / 2;
    let sY;
    if (relPos < 0) {
      sY = viewHeight + cZ * pY / relPos;
    } else if (relPos > 0) {
      sY = viewHeight - cZ * pY / relPos;
    } else {
      sY = viewHeight;
    }
    return [sX, sY, Math.pow(focalLength + pY, 2) + Math.pow((0 - pX), 2)];
  };

export const perspective2d =
  (vector) =>
    perspective(vector).slice(0, 2);

export const calcWorldPosition =
  ([sX, sY]) => {
    const [cX, cY, cZ] = camera;
    const pY = cY / (-cZ / (sY - viewHeight) - 1);
    const pX = -((-2 * cX * cY) + (viewWidth * pY) + (viewWidth * cY) + (-2 * sX * pY) + (-2 * sX * cY)) / (2 * cY);
    return [pX, pY];
  };
