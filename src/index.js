import titleScreen from 'titlescreen';
import Scene from 'scene';
import { setCanvas, ctx } from 'pura/canvas/tuple';

export const canvas = document.querySelector(`canvas`);
setCanvas(canvas);

Scene(titleScreen);
