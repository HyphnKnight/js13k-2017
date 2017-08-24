(function () {
'use strict';

const context = new AudioContext();

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

async function playNote(note, length) {
  if (note === '') return await wait(length * 1000 * 0.75);
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);

  oscillator.type = 'sawtooth';
  oscillator.frequency.value = note;
  gain.connect(context.destination);
  oscillator.start(0);

  gain.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + length
  );

  await wait(length * 1000 * 0.75);
}

async function playSong(music) {
  let i = -1;
  let h = -1;
  while (++i < music.length) {
    const [note, length] = music[i];
    if (Array.isArray(note)) {
      while (++h < note.length - 1) {
        playNote(note[h], Array.isArray(length) ? length[h] : length);
      }
      playNote(note[h], Array.isArray(length) ? length[h] : length);
      await wait((Array.isArray(length) ? Math.min(...length) : length) * 1000 * 0.75);
      h = -1;
    } else {
      await playNote(note, length);
    }
  }
  return await true;
}

const C4 = 261.63;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.26;
const F5 = 698.46;
const G5 = 783.99;
const A5 = 880.00;
const Bb5 = 932.33;
const B5 = 987.77;
const C6 = 1046.50;
const D6 = 1174.66;
const E6 = 1318.51;
const F6 = 1396.91;
const G6 = 1567.98;
const A6 = 1760.00;
const playCanonD = async () => await playSong([

  // line 1
  [[E5, C5], 1],
  [[D5, G4], 1],

  [[C5, A4], 1],
  [[B4, E4], 1],

  [[A4, F4], 1],
  [[G4, C4], 1],

  [[A4, F4], 1],
  [[B4, G4], 1],

  // line 2
  [[E6, G5, C5], 1],
  [[D6, B5, G4], 1],

  [[C6, A4], 1],
  [[B5, G5, E4], 1],

  [[A5, C5, F4], 1],
  [[G5, E5, C4], 1],

  [[A5, F5, F4], 1],
  [[B5, D5, G4], 1],

  // line 3
  [[C6, C5, E5], [0.5, 1, 1]],
  [C6, 0.5],
  [[D6, D5, G4], [0.5, 1, 1]],
  [B5, 0.5],

  [[C6, E5, A5], [0.5, 1, 1]],
  [E6, 0.5],
  [[G6, E4], [0.5, 1, 1]],
  [G5, 0.5],

  [[A5, A4, F4], [0.5, 1, 1]],
  [F5, 0.5],
  [[E5, C4], [0.5, 1, 1]],
  [G5, 0.5],

  [[F5, A4, F4], [0.5, 1, 1]],
  [C6, 0.5],
  [[B5, B4, G4], [0.5, 1, 1]],
  [G5, 0.5],

  // line 4
  [[C6, E5, C5], [0.5, 1, 1]],
  [E6, 0.25],
  [G6, 0.25],
  [[G6, G4], [0.25, 1, 1]],
  [A6, 0.25],
  [G6, 0.25],
  [F6, 0.25],

  [[E6, A4, C5], [0.75, 1, 1]],
  [E6, 0.25],
  [[E6, G4, E4], [0.25, 1, 1]],
  [F6, 0.25],
  [E6, 0.25],
  [D6, 0.25],

  [[C6, A4, F4], [0.25, 1, 1]],
  [Bb5, 0.25],
  [A5, 0.25],
  [B5, 0.25],
  [[G5, E4, C4], [0.5, 1, 1]],
  [E5, 0.5],

  [[C5, A4, F4], [0.5, 1, 1]],
  [F5, 0.25],
  [E5, 0.25],
  [[D5, B4, G4], [0.5, 1, 1]],
  [G5, 0.25],
  [F5, 0.25],


  // line 5
  [['', E5, C5], [0.5, 1, 1]],
  [C6, 0.5],
  [[D6, G4], [0.5, 1, 1]],
  [B5, 0.5],

  [[C6, C5, A4], [0.5, 1, 1]],
  [E5, 0.5],
  [[G5, B4, E4], [0.75, 1, 1]],
  [A5, 0.25],

  [[F5, A4, F4], [0.5, 1, 1]],
  [C5, 0.5],
  [[E5, G4, C4], [0.5, 1, 1]],
  [G5, 0.5],

  [[F5, A4, F4], [0.5, 1, 1]],
  [E5, 0.5],
  [[D5, B4, G4], [0.5, 1, 1]],
  [G5, 0.5],

  [[E5, C5, C4], [2, 2, 2]],

]);

playCanonD();
// import { createRectangle, getRectanglePoints } from 'lib/geometry';
// import { mapList, addList, scaleToSet, addSet, subtract, magnitude } from 'lib/vector';
// import { sign } from 'lib/math';
// import { viewWidth, viewHeight } from 'dom';
// import { render, palette } from 'ui';
// import { perspective } from 'perspective';
// import { mkTree, mkTreeAlt, mkCloud, mkAvenger, mkChild, mkProtector, mkPersecutor, mkPool, mkDiamond } from 'sprite';
// import { tree, treeAlt, avenger, cloud, mountain, child, protector, persecutor } from 'emoji';
// import { camera } from 'camera';
// import { inputs } from 'controls';
// import state from 'state';

// // state.dialog.push(
// //   [
// //     `I thought what I'd do was, I'd pretend I was one of those deaf-mutes.`,
// //     [avenger, `Avenger`],
// //   ], [
// //     `Of polished desert-quarried marble were its walls, in height 300 cubits and in breadth 75,`,
// //     [child, `Child`]
// //   ], [
// //     `so that chariots might pass each other as men drave them along the top.`,
// //     [child, `Child`]
// //   ], [
// //     `For full 500 stadia did they run, being open only on the side toward the lake;`,
// //     [protector, `Protector`]
// //   ], [
// //     `where a green stone sea-wall kept back the waves that rose oddly once a year`,
// //     [protector, `Protector`]
// //   ], [
// //     `at the festival of the destroying of Ib.`,
// //     [protector, `Protector`]
// //   ], [
// //     `In Sarnath were fifty streets from the lake to the gates of the caravans,`,
// //     [persecutor, `Persecutor`]
// //   ], [
// //     `and fifty more intersecting them.`,
// //     [persecutor, `Persecutor`]
// //   ]);

// let dt = 0;
// let t = 0;


// const groundPlane = createRectangle([0, 1600 / 2], 0, 10000, 1600);
// const windowRect = createRectangle([0, 0], 0, viewWidth * 2, viewHeight * 2);

// const { fillText, fillPolygon, strokePolygon, fillArc } = palette;

// const groundGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
// groundGradient.addColorStop(0, `#5E8C6A`);
// groundGradient.addColorStop(1, `#BFB35A`);

// const skyGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
// skyGradient.addColorStop(0, `#69D2E7`);
// skyGradient.addColorStop(1, `#A7DBD8`);

// // Generate Trees
// const objects = [];
// let i = 1000;
// while (--i > 0) {
//   objects.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
//     Math.random() * 5120 - 2560,
//     Math.random() * 1280,
//   ], 0));
// }

// i = 25;
// while (--i > 0) {
//   objects.push(mkCloud([
//     Math.random() * 10000 - 5000,
//     Math.random() * 1000 + 3500,
//   ], Math.random() * 30 + 10));
// }

// i = 5;
// while (--i > 0) {
//   objects.push(mkPool([
//     Math.random() * 5120 - 2560,
//     Math.random() * 1280,
//   ], 0));
// }

// const charSpeed = 3;
// const direction = [0, 0];
// const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
// const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
// const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
// const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
// const diamondSprite = mkDiamond([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

// const calcFollow = (followPos) => (sprite, distance) => {
//   const relativePos = subtract(state.position, sprite);
//   if (magnitude(relativePos) > distance) {
//     addSet(sprite, scaleToSet(relativePos, charSpeed));
//   }
// };

// objects.push(avngSprite, chldSprite, protSprite, persSprite, diamondSprite);

// requestAnimationFrame(function main() {
//   dt = Math.min(16, Date.now() - t);
//   camera[2] = 90; //+ (Date.now() % 3000) / 3000 * 120;

//   // Game Logic
//   direction[0] = 0;
//   direction[1] = 0;
//   if (inputs.w || inputs.up) {
//     direction[1] += 1;
//   }
//   if (inputs.s || inputs.down) {
//     direction[1] -= 1;
//   }
//   if (inputs.d || inputs.right) {
//     direction[0] += 1;
//   }
//   if (inputs.a || inputs.left) {
//     direction[0] -= 1;
//   }
//   addSet(state.position, scaleToSet(direction, charSpeed));
//   state.position[1] = Math.max(state.position[1], 5);
//   avngSprite[0] = state.position[0];
//   avngSprite[1] = state.position[1];
//   const follow = calcFollow(avngSprite);
//   follow(chldSprite, 20 + Date.now() % 300 / 30);
//   follow(protSprite, 45 + Date.now() % 300 / 30);
//   follow(persSprite, 70 + Date.now() % 300 / 30);
//   follow(diamondSprite, 90 + Date.now() % 300 / 30);
//   const xDiff = state.position[0] - camera[0];
//   if (Math.abs(xDiff) > viewWidth * 0.2) {
//     camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
//   }

//   // Render Graphics
//   palette.clear();
//   const calcScreenPosition = perspective(camera);

//   fillPolygon(
//     skyGradient,
//     [0, 0],
//     windowRect.points,
//   );

//   fillPolygon(
//     groundGradient,
//     [0, 0],
//     mapList(
//       addList(groundPlane.points, groundPlane.position),
//       calcScreenPosition,
//     ),
//   );

//   [...objects]
//     .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
//     .sort((a, b) => b[2] - a[2])
//     .forEach(([x, y, d, z, emoji]) => fillText({}, [x, y - z], emoji));

//   // Render UI
//   render();

//   t = Date.now();
//   requestAnimationFrame(main);
// });

}());
