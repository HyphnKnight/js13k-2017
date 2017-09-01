import { createRectangle, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { add, addSet, addList, subtractSet, subtractListSet, mapList, scaleSet, forEachList } from 'pura/vector/tuple';
import { ctx, fillArc, fillPolygon, strokePolygon } from 'pura/canvas/tuple';
import { isPointInPolygon } from 'pura/intersection/tuple';
import { generateGrid, hexPixelPosition } from 'pura/hex';
import { canvas, viewHeight, viewWidth, viewCenter } from 'dom';
import { heart, blackHeart } from 'emoji';
import { calcScreenPosition } from 'camera';
import { inputs } from 'controls';
import state from 'state';


const mapOffset = [0, 45];

const grid = generateGrid(10);
const baseHex = createEqualLateralPolygon([0, 0], 0, 6, 20);

const getScreenPositionVector = pnt => {
  const [x, y] = calcScreenPosition(pnt);
  return [x, y];
}

const drawHex = (hex) => {
  const position = addSet(scaleSet(hexPixelPosition(hex), 20), mapOffset);
  const viewPosition = calcScreenPosition(position);
  const points = mapList(addList(baseHex.points, position), pnt => {
    const [x, y] = calcScreenPosition(pnt);
    return [x, y];
  });
  if (state.target && isPointInPolygon(state.target, addList(baseHex.points, position))) {
    fillPolygon('green', [0, 0], points, 0);
  } else {
    strokePolygon({ style: 'green', thickness: 1 }, [0, 0], points, 0);
  }
  forEachList(points, pnt => fillArc('blue', pnt, 1, 0));
  fillArc('red', viewPosition, 1, 0);
};

const groundGradient = ctx.createLinearGradient(-100, -100, 200, 200);
groundGradient.addColorStop(0, `#036564`);
groundGradient.addColorStop(1, `#031634`);

const skyGradient = ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#5E8C6A`);
skyGradient.addColorStop(1, `#BFB35A`);

const groundPlane = {
  geometry: createRectangle([0, 0], 0, 10000, 1600),
  render({ geometry }) {
    const points = mapList(
      [...geometry.points],
      pnt => subtractSet(
        calcScreenPosition(addSet(pnt, [0, 800])),
        viewCenter
      )
    );
    fillPolygon(groundGradient, [0, 0], points);
  }
};

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
