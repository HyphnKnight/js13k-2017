/*
TODO:
[x] Can select a target hex my clicking
[x] Have a map of hex coordinates to position data
[x] Have a storage of 'optional' hexes (hexes you can act upon)
[x] Have a concept of flashing optional hexes
[x] Have the ability to cycle through hexes that are highlighted
[ ] Render hexes differently based on their status
[ ] have battle order in state
[ ] Render status bar when hihglighting hex with someone on it
*/


import { createRectangle, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { add, addSet, addList, subtractSet, subtractListSet, mapList, scaleSet, forEachList } from 'pura/vector/tuple';
import { ctx, fillArc, fillPolygon, strokePolygon, fillText } from 'pura/canvas/tuple';
import { flatten, contains } from 'pura/array';
import { generateGrid, hexToVector2d } from 'pura/hex';
import { canvas, viewHeight, viewWidth, viewCenter } from 'dom';
import { calcScreenPosition2d } from 'camera';
import { inputs, keyboardVector } from 'controls';
import characters from 'characters';
import state from 'state';


export const mapOffset = [0, 0];

export const gridScale = 40;

export const grid = generateGrid(5);

export const battleData = new Map(flatten(grid).map(hex => [hex, {
  hex,
  entity: null,
  status: [],
  position: null,
  points: null,
}]));

const randomRow = grid[Math.floor(Math.random() * grid.length)];
const randomHex = randomRow[Math.floor(Math.random() * randomRow.length)];
battleData.get(randomHex).entity = { name: 'protector', health: 70 };

const options = grid[Math.floor(Math.random() * grid.length)];
let selectedOption = 0;

const baseHex = createEqualLateralPolygon([0, 0], 0, 6, gridScale);

const calculateHexGeometry = hex => {
  const data = battleData.get(hex);
  const position = addSet(scaleSet(hexToVector2d(hex), gridScale), mapOffset);
  const viewPosition = calcScreenPosition2d(position);
  const points = mapList(addList(baseHex.points, position), calcScreenPosition2d);
  data.position = viewPosition;
  data.points = points;
  return data;
};

const drawFill =
  ({ hex, points }) =>
    contains(options, hex) ? Date.now() % 600 > 400 && fillPolygon(options[selectedOption] === hex ? `green` : `yellow`, [0, 0], points, 0) :
      state.target === hex ? Date.now() % 600 > 400 && fillPolygon(`white`, [0, 0], points, 0) :
        null;

const drawOutline =
  ({ points }) =>
    strokePolygon({ style: `white`, thickness: 1 }, [0, 0], points, 0);

const drawEntity =
  ({ entity, position }) =>
    entity
      ? fillText({ horizontalAlign: true }, position, characters[entity.name].emoji)
      : null;

const groundGradient = ctx.createLinearGradient(-100, -100, 200, 200);
groundGradient.addColorStop(0, `#036564`);
groundGradient.addColorStop(1, `#031634`);

const skyGradient = ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#5E8C6A`);
skyGradient.addColorStop(1, `#BFB35A`);

const keyControls = keyboardVector(3);

export default {
  geometry: createRectangle([-viewWidth / 2, -viewHeight / 2], 0, viewWidth, viewHeight),
  render({ geometry }) {
    [].concat(...grid).forEach(calculateHexGeometry);
    battleData.forEach(drawFill);
    battleData.forEach(drawOutline);
    battleData.forEach(drawEntity);

    addSet(mapOffset, keyControls());
    if (inputs.e === 1) selectedOption = Math.min(++selectedOption, options.length - 1);
    if (inputs.q === 1) selectedOption = Math.max(--selectedOption, 0);
  }
};
