// Reused DOM elements and objects.

export const canvas = document.querySelector(`canvas`);
export const ctx = canvas.getContext(`2d`);
export const viewWidth = 320;
export const viewHeight = 240;
export let canvasOffsetLeft = c.offsetWidth;
export let canvasOffsetTop = c.offsetHeight;
export const addEventListener = window.addEventListener;

window.addEventListener(`onload`, () => {
  canvas.width = viewWidth;
  canvas.height = viewHeight;
});

window.addEventListener(`resize`, () => {
  canvas.width = viewWidth;
  canvas.height = viewHeight;
  canvasOffsetLeft = canvas.offsetWidth;
  canvasOffsetTop = canvas.offsetHeight;
});
