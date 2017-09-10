import { createRectangle, getRectanglePoints, createEqualLateralPolygon } from 'pura/geometry/tuple';
import { addList, mapListSet, scaleSet } from 'pura/vector/tuple';
import { ctx, fillRectangle, fillPolygon, strokePolygon, strokeOval, fillArc, strokeArc, fillText } from 'pura/canvas/tuple';
import { contains } from 'pura/array';
import { hexToVector2d } from 'pura/hex';
import { viewHeight, viewWidth } from 'dom';
import { perspective2d } from 'camera';
import { battleData, optionHexes, turnOrder } from 'battle/grid';
import { makeEvilPool } from 'overworld/pools';
import state from 'state';

// const selectColor = `#fcfc68`;
const optionColor = `#8f9e6f`;

const baseSquarePoints = getRectanglePoints(15, 15);

const calculatePoints = (hex, scale = 1) =>
  mapListSet(
    addList(
      scale === 1
        ? baseSquarePoints
        : getRectanglePoints(15 * scale, 15 * scale),
      scaleSet(hexToVector2d(hex), 20)
    ),
    perspective2d
  );

const drawFill =
  (hex) => {
    if(!hex) return;
    if(state.target === hex) {
      strokeOval({ style: optionColor }, [0, 0], calculatePoints(hex, Math.min(Date.now() % 2000 / 1000), 1));
    } else {
      strokeOval({ style: optionColor }, [0, 0], calculatePoints(hex));
    }
    // if(state.target === hex) {
    //   Date.now() % 600 > 400 && fillPolygon(selectColor, [0, 0], points, 0);
    // } else {
    //   strokePolygon({ style: gridColor, thickness: 1 }, [0, 0], points, 0);
    // }
  };

// const drawOutline =
//   ({ points }) =>
//     strokePolygon({ style: gridColor, thickness: 1 }, [0, 0], points, 0);

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
    [...optionHexes, state.target].forEach(drawFill);
    turnOrder.forEach(drawEntity);
  }
});
