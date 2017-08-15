import { render, palette } from './graphics/index';

let dt = 0;
let t = 0;
requestAnimationFrame(function main() {
  dt = Math.min(16, Date.now() - t);
  // console.log(dt);

  // Compute Logic

  // Render Graphics
  palette.clear();
  render();

  t = Date.now();
  requestAnimationFrame(main);
});
