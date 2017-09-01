import { viewWidth, viewHeight } from 'dom';

export const perspective =
  // camera coords in 3d space
  (camera) =>
    // 2d point in world space
    ([pX, pY]) => {
      const [cX, cY, cZ] = camera;
      const relPos = (pY + cY);
      const sX = pX + pY * (cX - pX) / (pY + cY) - cX + viewWidth / 2;
      let sY;
      if (relPos < 0) {
        sY = viewHeight + cZ * pY / relPos
      } else if (relPos > 0) {
        sY = viewHeight - cZ * pY / relPos;
      } else {
        sY = viewHeight;
      }
      return [sX, sY, Math.pow(cY + pY, 2) + Math.pow((cX - pX), 2)];
    };

export const reversePerspective =
  // camera coords in 3d space
  (camera) =>
    // 2d point on screen
    ([sX, sY]) => {
      const [cX, cY, cZ] = camera;
      const pY = cY / (-cZ / (sY - viewHeight) - 1);
      const pX = -((-2 * cX * cY) + (viewWidth * pY) + (viewWidth * cY) + (-2 * sX * pY) + (-2 * sX * cY)) / (2 * cY);
      return [pX, pY];
    };
