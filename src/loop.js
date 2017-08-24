let dt = 0;
let t = 0;

export default func => {
  let running = true;
  requestAnimationFrame(function main() {
    dt = Math.min(16, Date.now() - t);
    running && func(dt);
    t = Date.now();
    requestAnimationFrame(main);
  });
  return () => running = !running;
};
