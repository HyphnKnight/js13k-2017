// import { createRectangle, getRectanglePoints } from './lib/geometry/index';
// import { mapList, addList } from './lib/vector/index';
// import { render, palette } from './graphics/index';
// import { perspective } from './graphics/perspective';
// import { mkTree, mkTreeAlt, mkCloud } from './graphics/sprite';
// import { tree, treeAlt, avenger, cloud, mountain } from './graphics/emoji';
import Dialog from './dialog.js';

Dialog([
  `I am the very model of a modern major general!`,
  `I have the information: animal, vegetable, mineral!`,
  `It's 2AM and I need to sleep.`,
  `Fuh`,
  `Wuh tuh fuhhh`,
  `My cat's breth smels liek cat food`,
  `Hi rafe`
]);

// const dt = 0;
// const t = 0;

// const testRect = createRectangle([0, 1600 / 2], 0, 10000, 1600);
// const windowRect = createRectangle([0, 0], 0, window.innerWidth, window.innerHeight);


// const { fillText, fillPolygon, strokePolygon, fillArc } = palette;
// const getX = () => Date.now() % 6000 / 20 - 150;
// const getY = () => 120;
// const getZ = () => Date.now() % 6000 / 30 - 20;//200;
// const getCamera = () => ([
//   getX(),
//   getY(),
//   getZ(),
// ]);

// const groundGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
// groundGradient.addColorStop(0, `#5E8C6A`);
// groundGradient.addColorStop(1, `#BFB35A`);

// const skyGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
// skyGradient.addColorStop(0, `#69D2E7`);
// skyGradient.addColorStop(1, `#A7DBD8`);

// // Generate Trees
// const objects = [];
// let i = 1000;
// while(--i > 0) {
//   objects.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
//     Math.random() * 5120 - 2560,
//     Math.random() * 1280,
//   ], 0));
// }

// i = 25;
// while(--i > 0) {
//   objects.push(mkCloud([
//     Math.random() * 10000 - 5000,
//     Math.random() * 1000 + 3500,
//   ], Math.random() * 30 + 10));
// }

// requestAnimationFrame(function main() {
//   palette.clear();
//   const calcScreenPosition = perspective(getCamera());
//   fillPolygon(
//     skyGradient,
//     [0, 0],
//     windowRect.points,
//   );
//   fillPolygon(
//     groundGradient,
//     [0, 0],
//     mapList(
//       addList(testRect.points, testRect.position),
//       calcScreenPosition,
//     ),
//   );

//   [...objects]
//     .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
//     .sort((a, b) => b[2] - a[2])
//     .forEach(([x, y, d, emoji, offset]) => fillText({}, [x, y - offset], emoji));

//   fillText({ font: `16px` }, calcScreenPosition([20, 20]), avenger);

//   requestAnimationFrame(main);
// });

// requestAnimationFrame(function main() {
//   dt = Math.min(16, Date.now() - t);
//   // console.log(dt);

//   // Compute Logic

//   // Render Graphics
//   // palette.clear();
//   console.log(mapList(
//     addList(testRect.points, testRect.position),
//     calcScreenPosition,
//   ))
//   // render();

//   t = Date.now();
//   // requestAnimationFrame(main);
// });
