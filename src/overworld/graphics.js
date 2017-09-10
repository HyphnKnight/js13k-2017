import { addSet, rotateSet, scaleSet } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, addListSet, scaleList } from 'pura/vector/tuple';
import { fillPolygon, fillRectangle, fillText, fillOval, strokeOval, ctx } from 'pura/canvas/tuple';
import { perspective, perspective2d } from 'camera';
import { viewWidth, viewHeight } from 'dom';
import state from 'state';
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
const islandRadius = 1000;
const islandPoints = getRectanglePoints(islandRadius, islandRadius);
export const islandOffset = islandRadius;
const islandX = 0,
      islandY = islandOffset;
const calcIslandPoints =
  (scale = 1) =>
    mapListSet(
      addListSet(scaleList(islandPoints, scale), [0, islandOffset]),
      perspective2d,
    );

// Characters.
export const avngSprite = mkAvenger([...state.position], 0);
export const protSprite = mkProtector([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const chldSprite = mkChild([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const persSprite = mkPersecutor([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);
export const gemSprite = mkGem([state.position[0] + Math.random() * 20 - 10, state.position[1] + Math.random() * 20 - 10], 0);

graphics.push(avngSprite, protSprite, chldSprite, persSprite, gemSprite);

// Pools.
let currLevel = 0;
const showEvilPool = (evilPool)=> {
  ++currLevel;

  if(currLevel === 3) {
    state.dialog.callback = ()=> {
      evilPool.shouldDisplay = true;
    };

    currLevel = 0;
  }
};

const pools = [
  // LEVEL 1: Persector.
  makePersecutorPool(50, [-400, 800], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push([`You walked to school and back home.`]);
  }),
  makePersecutorPool(50, [-400, 600], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push(
      [`You stayed close behind the older kids.`],
      [`They threw cupcake and candy wrappers right on the sidewalk.`],
      [`You picked them up silently.`]
    );
  }),
  makePersecutorPool(50, [-300, 700], () => {
    showEvilPool(pools[3]);
    state.dialog.script.push([`You listened to the stories he invented.`]);
  }),
  makeEvilPool(50, [-300, 600], () => {
    state.dialog.callback = ()=> {
      state.miasma = -5;
      genMiasma();
    };
    state.dialog.script.push([`The one watching wasn't someone you knew.`]);
  }, false),

  // LEVEL 2: Child.
  makeChildPool(50, [-200, 800], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeChildPool(50, [-100, 600], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeChildPool(50, [-50, 700], () => {
    showEvilPool(pools[7]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeEvilPool(50, [-75, 900], () => {
    state.dialog.callback = ()=> {
      state.miasma = 150;
      genMiasma();
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  // LEVEL 3: Protector.
  makeProtectorPool(50, [50, 700], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeProtectorPool(50, [100, 600], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeProtectorPool(50, [125, 1000], () => {
    showEvilPool(pools[11]);
    state.dialog.script.push([`Somewhere, deep inside, was a really good person.`]);
  }),
  makeEvilPool(50, [125, 800], () => {
    state.dialog.callback = ()=> {
      state.miasma = 400;
      genMiasma();
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  // LEVEL 4: Avenger.
  makeAvengerPool(50, [200, 900], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeAvengerPool(50, [250, 610], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeAvengerPool(50, [320, 700], () => {
    showEvilPool(pools[15]);
    state.dialog.script.push([`DIALOG`]);
  }),
  makeEvilPool(50, [300, 800], () => {
    state.dialog.callback = ()=> {
      state.miasma = Infinity;
      genMiasma(`remove`);
    };
    state.dialog.script.push([`DIALOG`]);
  }, false),

  makeOriginalPool(50, [450, 800], () => { }),
];

// Island props.
const isOffshore = (propPos)=> {
  const [x, y] = propPos;

  // Prop outside circle.
  if(
    (islandRadius)*(islandRadius) <
    (x - islandX)*(x - islandX) +
    (y - islandY)*(y - islandY)
  ) {
    // Direction of center of island.
    return [x < islandX ? 1 : -1, y < islandY ? 1 : -1];
  }

  return false;
};

const props = [
  [mkTree, 50],
  [mkTreeAlt, 50],
  [mkMountain, 10],
];

const maxProps = props.reduce((prev, next)=> Math.max(prev.length ? prev[1] : prev, next[1]));

let i = 0;
while(++i < maxProps) {
  for(const [prop, amount] of props) {
    if(i < amount) {
      let pos = addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]);

      for(const pool of pools) {
        while(pool.collision(pos)) {
          pos[1]++;
        }
      }

      let dir = isOffshore(pos);
      while(dir) {
        pos = addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]);
        dir = isOffshore(pos);
      }

      graphics.push(
        prop(
          pos, 0
        )
      );
    }
  }
}

// Miasma.
let miasmaOnce = false;
const genMiasma = (remove)=> {
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
    const pos = addSet(scaleSet(rotateSet([0, 1], Math.random() * 2 * Math.PI), islandOffset * 0.5 * Math.random()), [0, islandOffset]);

    if(pos[0] < state.miasma) {
      pos[0] = state.miasma + Math.random()*100;
    }

    let dir = isOffshore(pos);
    while(dir) {
      pos[0] += dir[0];
      pos[1] += dir[1];

      dir = isOffshore(pos);
    }

    graphics.push(
      mkTulip(pos, 0)
    );
  }
};
genMiasma();

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;
// ground
const sand = `#CFB590`;

// sky
const skyBlue = `#CCF3FF`;

const groundGradient = ctx.createLinearGradient(0, 0, 200, 200);
[
  [`#e8e85c`, 0.1],
  [`#646410`, 0.9]
].map(([stop, pos])=> {
  groundGradient.addColorStop(pos, stop);
});

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

  const waveScaleFactor = Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;
  const adjustedWavePoints = calcIslandPoints(1.15 - waveScaleFactor);
  fillOval(
    sand,
    [0, 0],
    adjustedWavePoints,
  );

  strokeOval(
    { style: seaFoam, thickness: 5 },
    [0, 0],
    adjustedWavePoints,
  );

  fillOval(
    groundGradient,
    [0, 0],
    calcIslandPoints(1),
  );

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
