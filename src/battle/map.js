import mergeSort from 'pura/array/mergeSort';
import { createRectangle, getRectanglePoints } from 'pura/geometry/tuple';
import { addList, mapListSet, scaleSet } from 'pura/vector/tuple';
import { ctx, fillRectangle, strokeOval, fillText } from 'pura/canvas/tuple';
import { hexToVector2d } from 'pura/hex';
import { statusBarHeartFont } from 'style';
import { viewHeight, viewWidth } from 'dom';
import { perspective2d } from 'camera';
import { optionHexes, turnOrder } from 'battle/grid';
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
  };

// TODO: Draw different things based on status effects (hots/dots).
const entityTextStyle = ({ name, isBoss }) => ({ horizontalAlign: true, font: `${isBoss ? (name === `Harm` ? 30 : 20) : 12}px mono` });

const hasStatus =
  (status, match) =>
    !!status.find(({ type }) => type === match);


const checkStatus =
  (name, style, icon, offset) =>
    (position, status) =>
      hasStatus(status, name)
        ? fillText({ style, font: `6px mono` }, [position[0] + offset, position[1] + 5], icon)
        : null;


const checks = [
  checkStatus(`shield`, `blue`, `S`, -5),
  checkStatus(`heal`, `green`, `H`, 0),
  checkStatus(`damage`, `red`, `D`, 5),
];

const drawEntity =
  ([data, health, position, status]) => {
    if(health > 0) {
      const adjustedPosition = perspective2d(position);
      fillText(entityTextStyle(data), adjustedPosition, data.emoji);
      checks.forEach(check => check(adjustedPosition, status));
    } else if(data.type) {
      //render DEAD GUY
    }
  };

const skyGradient = ctx.createLinearGradient(0, 0, 100, 100);
skyGradient.addColorStop(0, `#F07241`);
skyGradient.addColorStop(1, `#601848`);

const basePool = makeEvilPool(200, [0, 0]);

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
    mergeSort([...turnOrder], ([, , [, y]]) => -y).forEach(drawEntity);
  }
});
