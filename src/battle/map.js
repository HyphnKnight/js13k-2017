import { createRectangle, createEqualLateralPolygon, getRectanglePoints } from 'pura/geometry/tuple';
import { mapListSet, add, addSet, addList, addListSet, subtractSet, subtractListSet, mapList, scaleSet, forEachList } from 'pura/vector/tuple';
import { ctx, fillArc, fillRectangle, fillPolygon, strokePolygon, fillText } from 'pura/canvas/tuple';
import { flatten, contains, firstValues } from 'pura/array';
import { generateGrid, hexToVector2d } from 'pura/hex';
import { canvas, viewHeight, viewWidth, viewCenter } from 'dom';
import { calcScreenPosition2d } from 'camera';
import { inputs, keyboardVector } from 'controls';
import characters from 'characters';
import state from 'state';


export const mapOffset = [0, 0];

export const gridScale = 20;

export const grid = generateGrid(5);

const gridColor = `#C04848`;
const selectColor = `#F07241`;
const optionColor = `#C04848`;

export const battleData = new Map(flatten(grid).map(hex => [hex, {
  hex,
  entity: null,
  status: [],
  position: null,
  points: null,
}]));

const randomRow = grid[Math.floor(Math.random() * grid.length)];
const randomHex = randomRow[Math.floor(Math.random() * randomRow.length)];
battleData.get(randomHex).entity = { name: `protector`, health: 70 };

const options = grid[Math.floor(Math.random() * grid.length)];
let selectedOption = null;

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
    state.target === hex ? Date.now() % 600 > 400 && fillPolygon(selectColor, [0, 0], points, 0) :
      contains(options, hex) ? Date.now() % 600 > 400 && fillPolygon(optionColor, [0, 0], points, 0) :
        null;

const drawOutline =
  ({ points }) =>
    strokePolygon({ style: gridColor, thickness: 1 }, [0, 0], points, 0);

const drawEntity =
  ({ entity, position }) =>
    entity
      ? fillText({ horizontalAlign: true }, position, characters[entity.name].emoji)
      : null;

const groundGradient = ctx.createLinearGradient(-100, -100, 200, 200);
groundGradient.addColorStop(0, `#300030`);
groundGradient.addColorStop(1, `#601848`);

const skyGradient = ctx.createLinearGradient(0, 0, 100, 100);
skyGradient.addColorStop(0, `#F07241`);
skyGradient.addColorStop(1, `#601848`);

const keyControls = keyboardVector(3);

export default {
  geometry: createRectangle([-viewWidth / 2, -viewHeight / 2], 0, viewWidth, viewHeight),
  render({ geometry }) {
    // Background
    fillRectangle(
      skyGradient,
      [0, 0],
      viewWidth * 2,
      viewHeight * 2,
      0,
    );

    fillPolygon(
      groundGradient,
      [0, 0],
      mapListSet(
        addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
        pnt => calcScreenPosition2d(pnt),
      ),
    );

    [].concat(...grid).forEach(calculateHexGeometry);
    battleData.forEach(drawFill);
    battleData.forEach(drawOutline);
    battleData.forEach(drawEntity);

    addSet(mapOffset, keyControls());
    if(state.target !== null) {
      const targetIndex = options.indexOf(state.target);
      if(targetIndex > -1) selectedOption = targetIndex;
      else selectedOption = null;
    }
    if(selectedOption === null && (inputs.q === 1 || inputs.e === 1)) {
      selectedOption = 0;
    } else if(inputs.e === 1) {
      selectedOption = ++selectedOption === options.length
        ? 0
        : selectedOption;
    } else if(inputs.q === 1) {
      selectedOption = --selectedOption < 0
        ? options.length - 1
        : selectedOption;
    }
    if(selectedOption !== null) state.target = options[selectedOption];
  }
};
