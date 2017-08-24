import { viewWidth, viewHeight } from 'dom';

export const perspective =
  // camera coords in 3d space
  (camera) =>
    // 2d point
    ([pX, pY]) => {
      const [cX, cY, cZ] = camera;
      return [
        pX + pY * (cX - pX) / (pY + cY) - cX + viewWidth / 2,
        viewHeight - ((cY + pY) === 0 ? 0 : cZ * pY / (cY + pY)),
        Math.sqrt(Math.pow(cY + pY, 2) + Math.pow((cX - pX), 2)),
      ];
    }
