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
import { ctx, fillArc, fillPolygon, strokePolygon } from 'pura/canvas/tuple';
import { flatten, contains } from 'pura/array';
import { generateGrid, hexToVector2d } from 'pura/hex';
import { canvas, viewHeight, viewWidth, viewCenter } from 'dom';
import { calcScreenPosition2d } from 'camera';
import { inputs, keyboardVector } from 'controls';
import state from 'state';


export const mapOffset = [0, 0];

export const gridScale = 40;

export const grid = generateGrid(5);

const lookUpTable = new Map(flatten(grid).map(hex => [hex, {
  entity: null,
  status: [],
}]));

const options = grid[Math.floor(Math.random() * grid.length)];
let selectedOption = 0;

const baseHex = createEqualLateralPolygon([0, 0], 0, 6, gridScale);

const drawHex = (hex) => {
  const position = addSet(scaleSet(hexToVector2d(hex), gridScale), mapOffset);
  const viewPosition = calcScreenPosition2d(position);
  const points = mapList(addList(baseHex.points, position), calcScreenPosition2d);
  if (state.target === hex) {
    fillPolygon(`white`, [0, 0], points, 0);
  }
  if (contains(options, hex)) {
    if (options[selectedOption] === hex) {
      Date.now() % 600 > 400 && fillPolygon(`yellow`, [0, 0], points, 0);
    } else {
      Date.now() % 600 > 400 && fillPolygon(`blue`, [0, 0], points, 0);
    }
  }
  strokePolygon({ style: `white`, thickness: 1 }, [0, 0], points, 0);
};

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

    [].concat(...grid).forEach(drawHex);

    addSet(mapOffset, keyControls());
    if (inputs.e === 1) selectedOption = Math.min(++selectedOption, options.length - 1);
    if (inputs.q === 1) selectedOption = Math.max(--selectedOption, 0);
  }
};
