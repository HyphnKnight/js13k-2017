import { createRectangle, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { addList, mapList, scaleSet } from 'pura/vector/tuple';
import { ctx, fillRectangle, fillPolygon, strokePolygon, fillText } from 'pura/canvas/tuple';
import { contains } from 'pura/array';
import { hexToVector2d } from 'pura/hex';
import { viewHeight, viewWidth } from 'dom';
import { perspective2d } from 'camera';
import { battleData, optionHexes, turnOrder } from 'battle/grid';
import { makeEvilPool } from 'overworld/pools';
import state from 'state';

const gridColor = `black`;
const selectColor = `#fcfc68`;
const optionColor = `#78005c`;

const baseHex = createEqualLateralPolygon([0, 0], 0, 6, 20);

const calculateHexGeometry = data => {
  const { hex } = data;
  const position = scaleSet(hexToVector2d(hex), 20);
  const viewPosition = perspective2d(position);
  const points = mapList(addList(baseHex.points, position), perspective2d);
  data.position = viewPosition;
  data.points = points;
  return data;
};

const drawFill =
  (options) =>
    ({ hex, points }) => {
      if(state.target === hex) Date.now() % 600 > 400 && fillPolygon(selectColor, [0, 0], points, 0);
      if(contains(options, hex)) {
        // Date.now() % 600 > 400 && fillPolygon(optionColor, [0, 0], points, 0);
        strokePolygon({ style: gridColor, thickness: 1 }, [0, 0], points, 0);
      }
    };

const drawOutline =
  ({ points }) =>
    strokePolygon({ style: gridColor, thickness: 1 }, [0, 0], points, 0);

// TODO: Draw different things based on status effects (hots/dots).
const entityTextStyle = { horizontalAlign: true };
const drawEntity =
  ([data, health, position,]) =>
    health > 0 && fillText(entityTextStyle, perspective2d(position), data.emoji);

const groundGradient = ctx.createLinearGradient(-100, -100, 200, 200);
groundGradient.addColorStop(0, `#480078`);
groundGradient.addColorStop(1, `#78005c`);

const skyGradient = ctx.createLinearGradient(0, 0, 100, 100);
skyGradient.addColorStop(0, `#F07241`);
skyGradient.addColorStop(1, `#601848`);

const basePool = makeEvilPool(400, [0, 0]);

export default ({
  geometry: createRectangle([-viewWidth / 2, -viewHeight / 2], 0, viewWidth, viewHeight),
  render() {
    // Background
    fillRectangle(
      skyGradient,
      [0, 0],
      viewWidth * 2,
      viewHeight * 2,
      0,
    );
    basePool.render();
    battleData.forEach(calculateHexGeometry);
    battleData.forEach(drawFill(optionHexes));
    // battleData.forEach(drawOutline);
    turnOrder.forEach(drawEntity);
  }
});
