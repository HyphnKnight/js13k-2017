import {
  generateGrid,
  get,
  getNeighborsGrid,
  distanceFromTo,
  getWithinGrid,
  getFromVector2d,
  hexToVector2d,
} from 'pura/hex';
import { pathTo } from 'pura/path/pathTo';
import { flatten, clear } from 'pura/array';
import { set, addSet, subtractSet, scale, scaleSet } from 'pura/vector/tuple';
import { animateFowardNoRepeat } from 'animation';
import { easeInOutQuart } from 'easing';
import { calcWorldPosition } from 'camera';
import characterData from 'characters';


export const cameraOffset = [0, -150];

export const gridScale = 20;

export const grid = generateGrid(5);
export const optionHexes = [];
export const turnOrder = [];

export const initializeMap = (characters) => {
  clear(turnOrder);
  turnOrder.push(...characters.map(([name, position]) => ([
    characterData[name], // Store Character Data
    characterData[name].maxHealth, // Set Health at start to max Health
    scaleSet(hexToVector2d(position), 20), // Set Position to a Vector instead of hex
    [], // Array of status Effects
  ])));
};

export const getHexFromVector2d = getFromVector2d(grid);
export const getGridHexFromVector2d =
  position =>
    getHexFromVector2d(scale(position, 1 / 20));
export const getGridHexFromClick =
  position =>
    getGridHexFromVector2d(calcWorldPosition(position));
export const getVector2dFromHex =
  hex =>
    scaleSet(hexToVector2d(hex), 20);

export const battleData = new Map(flatten(grid).map(hex => [hex, {
  hex,
  status: [],
  position: null,
  points: null,
}]));

export const getPathToTarget = pathTo(
  getNeighborsGrid(grid),
  (_, dst) => getCharacterAtHex(dst) ? 40 : 1,
  (hex, dest) => distanceFromTo(hex, dest),
  1000
);

export const getGridHexesWithin = getWithinGrid(grid);
export const getMovementOptions =
  (position, movement) =>
    getGridHexesWithin(position, movement)
      .filter(hex => !turnOrder.find(([, health, position]) => getGridHexFromVector2d(position) === hex && health > 0));

export const getNearbyCharacters =
  (type) =>
    (position, range) =>
      turnOrder.filter(
        ([data, health, cPosition]) =>
          (type === null || data.type === type) &&
          health > 0 &&
          distanceFromTo(getGridHexFromVector2d(position), getGridHexFromVector2d(cPosition)) <= range
      );

export const getNearbyCharacterHexes =
  (fetch) =>
    (position, range) =>
      fetch(position, range)
        .map(([, , position]) => getGridHexFromVector2d(position));

export const getNearbyAllies = getNearbyCharacters(true);
export const getNearbyEnemies = getNearbyCharacters(false);

export const getCharacterAtHex =
  (hex) =>
    turnOrder.find(([, health, position]) => getGridHexFromVector2d(position) === hex && health > 0);

export const moveCharacter =
  (position, destination, duration) => {
    const start = [...position];
    const diff = subtractSet([...destination], start);
    const progress = animateFowardNoRepeat(duration);
    return () => {
      const delta = easeInOutQuart(progress());
      set(position, ...addSet(scale(diff, delta), start));
      return delta === 1;
    };
  };
