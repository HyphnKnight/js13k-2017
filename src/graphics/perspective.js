export const perspective =
  // camera coords in 3d space
  ([cX, cY, cZ]) =>
    // 2d point
    ([pX, pY]) => ([
      pX + pY * (cX - pX) / (pY + cY) - cX + 160,
      240 - ((cY + pY) === 0 ? 0 : cZ * pY / (cY + pY)),
      Math.sqrt(Math.pow(cY + pY, 2) + Math.pow((cX - pX), 2)),
    ]);