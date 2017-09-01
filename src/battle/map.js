import { createRectangle, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { add, addSet, addList, subtractSet, subtractListSet, mapList, scaleSet } from 'pura/vector/tuple';
import { fillArc, fillPolygon, strokePolygon } from 'pura/canvas/tuple';
import { generateGrid, hexPixelPosition } from 'pura/hex';
import { canvas, ctx, viewHeight, viewWidth, viewCenter } from 'dom';
import { heart, blackHeart } from 'emoji';
import { calcScreenPosition } from 'camera';
import { inputs } from 'controls';


const mapOffset = [0, 0];

const grid = generateGrid(5);
const baseHex = createEqualLateralPolygon([0, 0], 0, 6, 20);

const createHex = (hex) => {
  const position = scaleSet(hexPixelPosition(hex), 20);
  return {
    geometry: createEqualLateralPolygon(position, 0, 6, 20),
    render({ geometry }) {

      const viewPosition = calcScreenPosition(add(position, mapOffset));

      geometry.position = subtractSet(viewPosition, viewCenter);

      geometry.points = subtractListSet(
        mapList(
          addList(baseHex.points, add(position, mapOffset)),
          pnt => subtractSet(calcScreenPosition(pnt), viewCenter)
        ),
        geometry.position
      );
      strokePolygon(`white`, 1, [0, 0], geometry.points, 0);
    },
    interact: {
      onMouseDown() {
        console.log(hex.toString());
      }
    }
  };
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

export const map = {
  geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),
  children: [groundPlane, ...[].concat(...grid).map(createHex)],
  render({ fillRectangle }, { geometry }) {
    fillRectangle(skyGradient, [0, 0], viewWidth, viewHeight);
    if(inputs.up) addSet(mapOffset, [0, -1]);
    if(inputs.down) addSet(mapOffset, [0, 1]);
  }
};
