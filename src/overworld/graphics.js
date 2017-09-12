import { addSet, subtract, magnitude, rotateSet, scaleSet, mapListSet, addListSet, average } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { isPointInCircle } from 'pura/intersection/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective, perspective2d } from 'camera';
import { viewWidth, viewHeight } from 'dom';
import state from 'state';
import { islands } from 'overworld/island';
import { tulip } from 'emoji';
import {
  mkTree,
  mkTreeAlt,
  mkAvenger,
  mkChild,
  mkProtector,
  mkPersecutor,
  mkGem,
  mkMountain,
  mkTulip
} from 'sprite';
import {
  makeAvengerPool,
  makeChildPool,
  makeProtectorPool,
  makePersecutorPool,
  makeOriginalPool,
  makeEvilPool,
} from 'overworld/pools';
import Scene from 'scene';
import ending from 'ending';

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
export const protSprite = mkProtector([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);

graphics.push(avngSprite, protSprite, chldSprite, persSprite, gemSprite);

// Pools / Levels.
const advLevel = function* () {
  let currLevel = 0,
      currPool = 0;

  while(currLevel < levels.length) {
    while(currPool < levels[currLevel][0].length) {
      levels[currLevel][1].toggle.display = ++currPool === levels[currLevel][0].length;
      yield currPool;
    }

    state.dialog.callback = filterMiasma;
    currPool = 0;
    yield ++currLevel;
  }

  filterMiasma();

  yield;
};

const leveler = advLevel();

const avengerAuthor = [avngSprite[3], `Avenger`],
      persecutorAuthor = [persSprite[3], `Persecutor`],
      protectorAuthor = [protSprite[3], `Protector`],
      childAuthor = [chldSprite[3], `Child`],
      originalAuthor = [gemSprite[3], `     `];

const levels = [
  // LEVEL 1 - Adulthood.
  [
    [
      makeAvengerPool(25, [-500, 800], () => {
        leveler.next();
        state.dialog.script.push(
          [`I hate them, and everything they created.`, avengerAuthor],
          [`I'll take them with me if I can.`, avengerAuthor]
        );
      }),
      makePersecutorPool(25, [-520, 1000], () => {
        leveler.next();
        state.dialog.script.push([`It couldn't hurt to try, right? Once - only once.`, persecutorAuthor]);
      }),
      makeChildPool(25, [-400, 700], () => {
        leveler.next();
        state.dialog.script.push(
          [`I have a new coat, with stars!`, childAuthor],
          [`I'm going to do all my favorite things today.`, childAuthor]
        );
      }),
      makeProtectorPool(25, [-450, 1100], () => {
        leveler.next();
        state.dialog.script.push([`It takes so much effort at times, but we're worth all of it.`, protectorAuthor]);
      }),
    ],
    makeEvilPool(25, [-450, 900], () => {
      leveler.next();
      state.miasma = -5;
      state.dialog.script.push(
        [`You take out groceries one-by-one, and stack them in the pantry.`, originalAuthor],
        [`At least three of your things were already in there.`, originalAuthor],
      );
    }, false)
  ],

  // LEVEL 2 - Young Adulthood.
  [
    [
      makeChildPool(25, [-200, 800], () => {
        leveler.next();
        state.dialog.script.push([`I made a lot of new friends.`, childAuthor]);
      }),
      makeProtectorPool(25, [-100, 1200], () => {
        leveler.next();
        state.dialog.script.push(
          [`Two years and we're beginning to take a turn.`, protectorAuthor],
        );
      }),
      makePersecutorPool(25, [-50, 700], () => {
        leveler.next();
        state.dialog.script.push([`Liars can never get close to me.  I'm a liar too.`, persecutorAuthor]);
      })
    ],
    makeEvilPool(25, [-75, 900], () => {
      leveler.next();
      state.miasma = 150;
      state.dialog.script.push([`Some of your friends only know one of you.`, originalAuthor]);
    }, false),
  ],

  // LEVEL 3 - Teenhood.
  [
    [
      makePersecutorPool(25, [50, 800], () => {
        leveler.next();
        state.dialog.script.push(
          [`That little piss hung up on me.`, persecutorAuthor]
        );
      }),
      makeChildPool(25, [100, 700], () => {
        leveler.next();
        state.dialog.script.push(
          [`He said he doesn't like me anymore.`, childAuthor],
          [`I was too hard to be around.`, childAuthor]
        );
      }),
    ],
    makeEvilPool(25, [125, 800], () => {
      leveler.next();
      state.miasma = 300;
      state.dialog.script.push(
        [`You went to his house for dinner.`, originalAuthor],
        [`Everyone was was confused when you arrived.`, originalAuthor],
        [`You were afraid.`, originalAuthor],
      );
    }, false),
  ],

  // LEVEL 4 - Childhood.
  [
    [
      makeChildPool(25, [200, 900], () => {
        leveler.next();
        state.dialog.script.push(
          [`I walked to school and back home every day.`, childAuthor],
          [`I stayed close behind the older kids.`, childAuthor],
          [`They threw cupcake and candy wrappers right on the sidewalk.`, childAuthor],
          [`I picked them up.`, childAuthor],
          [`The one watching wasn't someone I knew.`, childAuthor],
          [`I listened to his stories.`, childAuthor]
        );
      })
    ],
    makeEvilPool(25, [250, 800], () => {
      leveler.next();
      state.miasma = Infinity;
      state.dialog.script.push([`When he kissed you, it wasn't the same.`, originalAuthor]);
    }, false)
  ]
];

let triggerEnding = false,
    endingStart;
const originalPool = makeOriginalPool(25, [350, 900], () => {
  graphics = [];
  pools.splice(0, pools.length - 1);
  endingStart = Date.now();
  triggerEnding = true;
});
let pools = [originalPool];

for(const level of levels) {
  pools.unshift(...level[0], level[1]);
}

// Props.
const props = [
  [mkTree, 50],
  [mkTreeAlt, 50],
  [mkMountain, 10],
  [mkTulip, 500]
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
    !pools.find(({ collision }) => collision(point));

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

// Miasma.
const filterMiasma = () => graphics = graphics.filter(([x, , , emoji]) => emoji !== tulip || x > state.miasma);
filterMiasma();

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;

// sky
const skyBlue = `#90b4ec`;

export const render = () => {
  // Background
  fillRectangle(
    skyBlue,
    [0, 0],
    viewWidth * 2,
    viewHeight * 2,
    0,
  );

  fillPolygon(
    baseOcean,
    [0, 0],
    groundPlanePoints,
  );

  const waveScaleFactor = 1.2 - Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;

  islands.forEach(({ getShoreLine }) => strokeOval(
    { style: seaFoam, thickness: 4 },
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
    const diff = Date.now() - endingStart;

    if(diff > 3000) {
      Scene(ending);
      return;
    }

    pools = [makeOriginalPool(25 + (diff/3000)*(200 - 25), [350, 900])];
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
