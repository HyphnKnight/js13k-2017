import { perspective, reversePerspective } from 'perspective';

export const camera = [0, 80, 140];

export const calcScreenPosition = perspective(camera);
export const calcScreenPosition2d =
  (vector) =>
    calcScreenPosition(vector).slice(0, 2);
export const calcWorldPosition = reversePerspective(camera);
