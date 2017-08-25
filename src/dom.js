// Reused DOM elements and objects.

export const canvas = document.querySelector(`canvas`);
export const ctx = canvas.getContext(`2d`);
ctx.imageSmoothingEnabled = false;
export const viewWidth = 160;
export const viewHeight = 192;
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

window.addEventListener(`resize`, calcCanvasSize);
