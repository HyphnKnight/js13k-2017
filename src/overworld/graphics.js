import { addSet, subtract, magnitude, rotateSet, scaleSet, mapListSet, addListSet, average } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { isPointInCircle } from 'pura/intersection/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective, perspective2d } from '../camera.js';
import { viewWidth, viewHeight } from '../dom.js';
import state from '../state.js';
import { islands } from './island.js';
import { tulip } from '../emoji.js';
import { createBattleScene } from '../battle/index.js';
import {
  mkTree,
  mkTreeAlt,
  mkAvenger,
  mkChild,
  mkProtector,
  mkPersecutor,
  mkGem,
  mkMountain,
  mkTulip,
  mkGrass,
} from '../sprite.js';
import {
  makeAvengerPool,
  makeChildPool,
  makeProtectorPool,
  makePersecutorPool,
  makeOriginalPool,
  makeEvilPool,
} from './pools.js';
import Scene from '../scene.js';
import ending from '../ending.js';

export let graphics = [];

const groundPlanePoints = mapListSet(
  addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
  perspective2d,
);

// Island Geometry
const islandPosition = average(islands.map(({ position }) => position));
const islandRadius = Math.max(...islands.map(({ position }) => magnitude(subtract(position, islandPosition)))) + 200;

// Characters.
export const avngSprite = mkAvenger([...state.position], 0);
export const protSprite = mkProtector(addSet([0, 10], state.position), 0);
export const chldSprite = mkChild(addSet([-10, 0], state.position), 0);
export const persSprite = mkPersecutor(addSet([10, 0], state.position), 0);
export const gemSprite = mkGem(addSet([0, -10], state.position), 0);

graphics.push(avngSprite, protSprite, chldSprite, persSprite, gemSprite);

/*
  Miasma / Pool Creation
*/


const updateMiasma = (inc) => {
  state.miasma += 50 * inc;
  graphics = graphics.filter(([x, , , emoji]) => emoji !== tulip || x > state.miasma);
};

let triggerEnding = false;
let endingStart = 0;
const createPool =
  (maker, dialog, position) => maker(
    25,
    position,
    () => state.dialog.push(...dialog),
  );

const avengerAuthor = [avngSprite[3], `Avenger`];
const persecutorAuthor = [persSprite[3], `Persecutor`];
const protectorAuthor = [protSprite[3], `Protector`];
const childAuthor = [chldSprite[3], `Child`];
const originalAuthor = [gemSprite[3], `Origin`];

const pools = [];

const poolScript = [
  // LEVEL 1 - Adulthood.
  [makeAvengerPool, [
    [`No more running, I'm coming for him.`, avengerAuthor],
    // [`I'll take them with me if I can.`, avengerAuthor]
  ]],
  [makeChildPool, [
    [`Why isn't she returning my calls, it's not like her.`, childAuthor],
    // [`I'm going to do all my favorite things today.`, childAuthor]
  ]],
  [makePersecutorPool, [
    [`She broke up with me, of course.`, persecutorAuthor]
  ]],
  [makeProtectorPool, [
    [`It takes so much effort at times, but we're worth all of it.`, protectorAuthor]
  ]],
  [makeEvilPool, [
    [`I saw him again, after all these years.`, originalAuthor],
    [`He greeted me like we were old friends.`, originalAuthor],
    () => { updateMiasma(5); Scene(createBattleScene(6, 0, 0, `deceit`)) },
  ]],
  // LEVEL 2 - Young Adulthood.
  [makeChildPool, [
    [`I can't believe it she said YES!`, childAuthor],
  ]],
  [makeProtectorPool, [
    [`One or two bar fights later,`, protectorAuthor],
    [`people didn't mess with me anymore.`, protectorAuthor]
  ]],
  [makePersecutorPool, [
    [`She will never say yes to someone like us.`, persecutorAuthor],
  ]],
  [makeEvilPool, [
    [`People pushed me around in college,`, originalAuthor],
    [`I couldn't take it anymore.`, originalAuthor],
    () => { updateMiasma(4); Scene(createBattleScene(6, 4, 0, `resentment`)) },
  ]],

  // LEVEL 3 - Teenhood.
  [makePersecutorPool, [
    [`It hurt, but its worth it.`, persecutorAuthor]
  ]],
  [makeChildPool, [
    [`My daddy yelled at me, for playing with my toys.`, childAuthor],
    // [`I was too hard to be around.`, childAuthor]
  ]],
  [makeEvilPool, [
    [`I think it was at highschool graduation.`, originalAuthor],
    [`It was all my fault.`, originalAuthor],
    () => { updateMiasma(2); Scene(createBattleScene(0, 4, 2, `doubt`)) },
  ]],

  // LEVEL 4 - Childhood.

  [makeChildPool, [
    // [`I walked to school and back home every day.`, childAuthor],
    [`I stayed close behind the older kids.`, childAuthor],
    [`They threw cupcake and candy wrappers right on the sidewalk.`, childAuthor],
    [`He didn't talk to me, when I was with them.`, childAuthor],
    // [`I listened to his stories.`, childAuthor]
  ]],


  [makeEvilPool, [
    [`It hurt he told you it wasn't meant to, but it did.`, originalAuthor],
    () => { updateMiasma(100); Scene(createBattleScene(6, 4, 2, `harm`)) },
  ]],

  [makeOriginalPool, [
    () => {
      graphics = [];
      pools.splice(0, pools.length - 1);
      endingStart = Date.now();
      triggerEnding = true;
    }
  ]]
];

{
  const length = poolScript.length + 4;
  let i = -1;
  while(++i < length) {
    const [maker, text] = poolScript.shift();
    pools.push(createPool(maker, text, [
      i * 50 - 550,
      650 + Math.random() * 400 | 0,
    ]));
    if(maker === makeEvilPool)++i;
  }
}

// Props.
const props = [
  [mkTree, 50],
  [mkTreeAlt, 50],
  [mkMountain, 10],
  [mkTulip, 500],
  [mkGrass, 300]
];

const generatePropPosition =
  () =>
    addSet(
      scaleSet(
        rotateSet([0, 1], Math.random() * 2 * Math.PI),
        islandRadius * Math.random()
      ),
      islandPosition
    );

export const isOnIsland =
  (point) =>
    isPointInCircle(point, islandPosition, islandRadius) &&
    !!islands.find(({ collision }) => collision(point));

const isValidPropPosition =
  (point) =>
    isOnIsland(point) &&
    !pools.find(({ propCollision }) => propCollision(point));

const generateValidPropPoint =
  () => {
    let point = generatePropPosition();
    while(!isValidPropPosition(point)) point = generatePropPosition();
    return point;
  };

const len = Math.max(...props.map(([, count]) => count));
let i = -1;
while(++i < len) {
  for(const [prop, amount] of props) {
    if(i < amount) {
      graphics.push(prop(generateValidPropPoint(), 0));
    }
  }
}

updateMiasma(5);
export const render = () => {
  // Background
  fillRectangle(
    `#90b4ec`,
    [0, 0],
    viewWidth * 2,
    viewHeight * 2,
    0,
  );

  fillPolygon(
    `#69D2E7`,
    [0, 0],
    groundPlanePoints,
  );

  const waveScaleFactor = 1.2 - Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;

  islands.forEach(({ getShoreLine }) => strokeOval(
    { style: `#fff`, thickness: 4 },
    [0, 0],
    getShoreLine(waveScaleFactor),
  ));

  islands.forEach(({ getShoreLine }) => fillOval(
    `#fafac8`,
    [0, 0],
    getShoreLine(waveScaleFactor),
  ));

  islands.forEach(({ getBase }) => fillOval(
    `#00c864`,
    [0, 0],
    getBase(),
  ));

  // Ending segment within map.
  if(triggerEnding) {
    Scene(ending);
    // const diff = Date.now() - endingStart;

    // if(diff > 3000) {
    //   return;
    // }

    // pools.push(makeOriginalPool(25 + (diff / 3000) * (200 - 25), [350, 900]));
  }
  for(const pool of pools) {
    pool.render();
    pool.test(state.position);
  }

  // Dynamic
  graphics
    .map(point => [...perspective(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji, size]) => fillText(
      { font: `${(12 * size * (1 - 2 * (d - 10994) / 8248748)) | 0}px monospace` },
      [x, y - z],
      emoji
    ));

};
