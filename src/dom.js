// Reused DOM elements and objects.
import { setCanvas, ctx } from 'pura/canvas/tuple';
export const canvas = document.querySelector(`canvas`);
setCanvas(canvas, { alpha: false });
ctx.imageSmoothingEnabled = false;
export const viewWidth = 160;
export const viewHeight = 192;
export const viewCenter = [viewWidth / 2, viewHeight / 2];
export let canvasOffsetLeft = canvas.offsetWidth;
export let canvasOffsetTop = canvas.offsetHeight;
export let scaleX = 1;
export let scaleY = 1;
export const addEventListener = window.addEventListener;
canvas.width = viewWidth;
canvas.height = viewHeight;

const calcCanvasSize = () => {
  const { top, left, width, height } = canvas.getBoundingClientRect();
  canvasOffsetLeft = left;
  canvasOffsetTop = top;
  scaleX = viewWidth / width;
  scaleY = viewHeight / height;
};

calcCanvasSize();
document.addEventListener(`DOMContentLoaded`, calcCanvasSize);
window.addEventListener(`resize`, calcCanvasSize);
