import { perspective } from 'perspective';

export const camera = [0, 120, 200];

export const calcScreenPosition = perspective(camera);
