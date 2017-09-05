/*
TODO:
[ ] Can select a target hex my clicking
[x] Have a map of hex coordinates to position data
[ ] Have a storage of 'optional' hexes (hexes you can act upon)
[ ] Have a concept of flashing optional hexes
[ ] Have the ability to cycle through hexes that are highlighted
[ ] Render hexes differently based on their status
[ ] have battle order in state
[ ] Render status bar when hihglighting hex with someone on it
*/


import { createRectangle, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { add, addSet, addList, subtractSet, subtractListSet, mapList, scaleSet, forEachList } from 'pura/vector/tuple';
import { ctx, fillArc, fillPolygon, strokePolygon } from 'pura/canvas/tuple';
import { isPointInPolygon } from 'pura/intersection/tuple';
import { flatten } from 'pura/array';
import { generateGrid, hexToVector2d } from 'pura/hex';
import { canvas, viewHeight, viewWidth, viewCenter } from 'dom';
import { heart, blackHeart } from 'emoji';
import { calcScreenPosition2d } from 'camera';
import { inputs } from 'controls';
import state from 'state';


export const mapOffset = [0, 0];

export const grid = generateGrid(5);

const lookUpTable = new Map(flatten(grid).map(hex => [hex.join('/'), {
  entity: null,
  status: [],
}]));

const baseHex = createEqualLateralPolygon([0, 0], 0, 6, 40);

const drawHex = (hex) => {
  const position = addSet(scaleSet(hexToVector2d(hex), 40), mapOffset);
  const viewPosition = calcScreenPosition2d(position);
  const points = mapList(addList(baseHex.points, position), calcScreenPosition2d);
  if (state.target === hex) {
    fillPolygon(`white`, [0, 0], points, 0);
  }
  strokePolygon({ style: `white`, thickness: 1 }, [0, 0], points, 0);
};

const groundGradient = ctx.createLinearGradient(-100, -100, 200, 200);
groundGradient.addColorStop(0, `#036564`);
groundGradient.addColorStop(1, `#031634`);

const skyGradient = ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#5E8C6A`);
skyGradient.addColorStop(1, `#BFB35A`);

export default {
  geometry: createRectangle([-viewWidth / 2, -viewHeight / 2], 0, viewWidth, viewHeight),
  render({ geometry }) {

    [].concat(...grid).forEach(drawHex);

    if (inputs.up || inputs.w) addSet(mapOffset, [0, -1]);
    if (inputs.down || inputs.s) addSet(mapOffset, [0, 1]);

    if (inputs.left || inputs.a) addSet(mapOffset, [1, 0]);
    if (inputs.right || inputs.d) addSet(mapOffset, [-1, 0]);
  }
};
