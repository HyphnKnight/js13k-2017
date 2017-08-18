// Reused DOM elements and objects.

export const c = document.querySelector(`canvas`);
export const ctx = c.getContext(`2d`);
export const w = 160;
export const h = 192;
export let cw = c.offsetWidth;
export let ch = c.offsetHeight;
export const e = window.addEventListener;

window.addEventListener(`resize`, ()=> {
  cw = c.offsetWidth;
  ch = c.offsetHeight;
});
