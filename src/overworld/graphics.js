import { addSet, subtract, magnitude, rotateSet, scaleSet, mapListSet, addListSet, average } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { isPointInCircle } from 'pura/intersection/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective, perspective2d } from 'camera';
import { viewWidth, viewHeight } from 'dom';
import state from 'state';
import { islands } from 'overworld/island';
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

export const graphics = [];

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

// Pools.
const advLevel = function* () {
  let currLevel = 0,
      currPool = 0;

  while(currLevel < levels.length) {
    while(currPool < levels[currLevel][0].length) {
      yield ++currPool;
    }

    levels[currLevel][1].shouldDisplay = true;
    state.dialog.callback = () => {
      genMiasma();
    };
    currPool = 0;
    yield ++currLevel;
  }

  yield;
};

const leveler = advLevel();

const levels = [
  // LEVEL 1.
  [
    [
      makePersecutorPool(25, [-500, 800], () => {
        leveler.next();
        state.dialog.script.push([`You walked to school and back home.`]);
      }),
      makePersecutorPool(25, [-520, 1000], () => {
        leveler.next();
        state.dialog.script.push(
          [`You stayed close behind the older kids.`],
          [`They threw cupcake and candy wrappers right on the sidewalk.`],
          [`You picked them up silently.`]
        );
      }),
      makePersecutorPool(25, [-400, 700], () => {
        leveler.next();
        state.dialog.script.push([`You listened to the stories he invented.`]);
      }),
    ],
    makeEvilPool(25, [-300, 600], () => {
      leveler.next();
      state.miasma = -5;
      state.dialog.script.push([`The one watching wasn't someone you knew.`]);
    }, false)
  ],

  // LEVEL 2.
  [
    [
      makeChildPool(25, [-200, 800], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeChildPool(25, [-100, 600], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeChildPool(25, [-50, 700], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      })
    ],
    makeEvilPool(25, [-75, 900], () => {
      leveler.next();
      state.miasma = 150;
      state.dialog.script.push([`DIALOG`]);
    }, false),
  ],

  // LEVEL 3.
  [
    [
      makeProtectorPool(25, [50, 700], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeProtectorPool(25, [100, 600], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeProtectorPool(25, [125, 1000], () => {
        leveler.next();
        state.dialog.script.push([`Somewhere, deep inside, was a really good person.`]);
      })
    ],
    makeEvilPool(25, [125, 800], () => {
      state.miasma = 400;
      state.dialog.script.push([`DIALOG`]);
    }, false),
  ],

  // LEVEL 4.
  [
    [
      makeAvengerPool(25, [200, 900], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeAvengerPool(25, [250, 610], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      }),
      makeAvengerPool(25, [320, 700], () => {
        leveler.next();
        state.dialog.script.push([`DIALOG`]);
      })
    ],
    makeEvilPool(25, [300, 800], () => {
      state.miasma = Infinity;
      state.dialog.script.push([`DIALOG`]);
    }, false)
  ]
];

const pools = [
  makeOriginalPool(25, [350, 900], () => { }),
];

for(const level of levels) {
  pools.unshift(...level[0], level[1]);
}

// Props.
const props = [
  [mkTree, 50],
  [mkTreeAlt, 50],
  [mkMountain, 10],
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
let miasmaOnce = false;
const genMiasma = (remove) => {
  if(!miasmaOnce) {
    miasmaOnce = true;
  } else {
    graphics.splice(-500, 500);
  }

  if(remove) {
    return;
  }

  let i = 0;

  while(++i < 500) {
    const pos = generateValidPropPoint();

    if(pos[0] < state.miasma) {
      pos[0] = state.miasma + Math.random() * 100;
    }

    graphics.push(mkTulip(pos, 0));
  }
};
genMiasma();

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;
// ground
const sand = `#fce08c`;

// sky
const skyBlue = `#90b4ec`;

const groundColor = `#6c9850`;

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
    sand,
    [0, 0],
    getShoreLine(waveScaleFactor),
  ));

  islands.forEach(({ getBase }) => fillOval(
    groundColor,
    [0, 0],
    getBase(),
  ));

  for(const pool of pools) {
    pool.render();
    pool.testCallback(state.position);
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
