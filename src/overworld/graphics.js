import { addSet, subtract, magnitude, rotateSet, scaleSet, mapListSet, addListSet, scaleList, average } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { isPointInCircle } from 'pura/intersection/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval, ctx } from 'pura/canvas/tuple';
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
// const islandRadius = islands;
// const islandPoints = getRectanglePoints(islandRadius, islandRadius);
// export const islandOffset = islandRadius;
// const islandX = 0,
//       islandY = islandOffset;
// const calcIslandPoints =
//   (scale = 1) =>
//     mapListSet(
//       addListSet(scaleList(islandPoints, scale), [0, islandOffset]),
//       perspective2d,
//     );

// Characters.
export const avngSprite = mkAvenger([...state.position], 0);
export const protSprite = mkProtector([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);

graphics.push(avngSprite, protSprite, chldSprite, persSprite, gemSprite);

// Pools.
let currLevel = 0;
const showEvilPool = (evilPool) => {
  ++currLevel;

  if(currLevel === 3) {
    state.dialog.callback = () => {
      evilPool.shouldDisplay = true;
    };

    currLevel = 0;
  }
};

const pools = [
  // LEVEL 1: Persector.
  makePersecutorPool(25, [-400, 800], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push([`You walked to school and back home.`]);
  }),
  makePersecutorPool(25, [-400, 600], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push(
      [`You stayed close behind the older kids.`],
      [`They threw cupcake and candy wrappers right on the sidewalk.`],
      [`You picked them up silently.`]
    );
  }),
  makePersecutorPool(25, [-300, 700], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push([`You listened to the stories he invented.`]);
  }),
  makeEvilPool(25, [-300, 600], () => {
    state.dialog.callback = () => {
      state.miasma = -5;
      // genMiasma();
    };
    state.dialog.script.push([`The one watching wasn't someone you knew.`]);
  }, false),

  // LEVEL 2: Child.
  makeChildPool(25, [-200, 800], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeChildPool(25, [-100, 600], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeChildPool(25, [-50, 700], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeEvilPool(25, [-75, 900], () => {
    state.dialog.callback = () => {
      state.miasma = 150;
      // genMiasma();
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  // LEVEL 3: Protector.
  makeProtectorPool(25, [50, 700], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeProtectorPool(25, [100, 600], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeProtectorPool(25, [125, 1000], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`Somewhere, deep inside, was a really good person.`]);
  }),
  makeEvilPool(25, [125, 800], () => {
    state.dialog.callback = () => {
      state.miasma = 400;
      // genMiasma();
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  // LEVEL 4: Avenger.
  makeAvengerPool(25, [200, 900], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeAvengerPool(25, [250, 610], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeAvengerPool(25, [320, 700], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeEvilPool(25, [300, 800], () => {
    state.dialog.callback = () => {
      state.miasma = Infinity;
      // genMiasma(`remove`);
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  makeOriginalPool(25, [450, 800], () => { }),
];

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

const isValidPropPosition =
  (point) => {
    const isOnIsland = isPointInCircle(point, islandPosition, islandRadius);
    const isOnASubIsland = !!islands.find(({ collision }) => collision(point));
    const isNotInAPool = true;//!pools.find(({ collision }) => collision(point));
    return isOnIsland && isOnASubIsland && isNotInAPool;
  };

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
// let miasmaOnce = false;
// const genMiasma = (remove) => {
//   if(!miasmaOnce) {
//     miasmaOnce = true;
//   } else {
//     graphics.splice(-500, 500);
//   }

//   if(remove) {
//     return;
//   }

//   let i = 0;

//   while(++i < 500) {
//     // const pos = addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]);

//     // if(pos[0] < state.miasma) {
//     //   pos[0] = state.miasma + Math.random() * 100;
//     // }

//     // let dir = isOffshore(pos);
//     // while(dir) {
//     //   pos[0] += dir[0];
//     //   pos[1] += dir[1];

//     //   dir = isOffshore(pos);
//     // }
//     graphics.push(mkTulip(generateValidPropPoint(), 0));
//   }
// };
// genMiasma();

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;
// ground
const sand = `#fce08c`;

// sky
const skyBlue = `#90b4ec`;

<<<<<<< HEAD
const groundColor = `#6c9850`; //ctx.createLinearGradient(0, 0, 200, 200);
=======
const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
[
  [`#e8e85c`, 0.1],
  [`#646410`, 0.9]
].map(([stop, pos]) => {
  groundGradient.addColorStop(pos, stop);
});
>>>>>>> Restructure

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

<<<<<<< HEAD
  fillOval(
    groundColor,
=======
  islands.forEach(({ getBase }) => fillOval(
    groundGradient,
>>>>>>> Restructure
    [0, 0],
    getBase(),
  ));

  // // Dynamic
  graphics
    .map(point => [...perspective(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji, size]) => fillText(
      { font: `${(12 * size * (1 - 2 * (d - 10994) / 8248748)) | 0}px monospace` },
      [x, y - z],
      emoji
    ));

};
