import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapList, addList, addListSet, subtract, scaleList, magnitudeSqr } from 'pura/vector/tuple';
import { fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective2d } from '../camera.js';


const createPool =
  (baseColor, shoreColor) =>
    (baseSize, position, callBack, display = true) => {
      const offset = ((Math.random() * 500)) | 0;
      const interval = 1800 + ((Math.random() * 1000) | 0);
      const speed = baseSize * 12;
      const basePoints = getRectanglePoints(baseSize * 2, baseSize * 2);
      const placedPoints = addList(basePoints, position);
      let adjustedPoints;
      const toggle = {
        display
      };
      const collision =
        (size) =>
          (targetPosition) =>
            magnitudeSqr(subtract(targetPosition, position)) <= size * size;
      const test = (targetPosition) => {
        if(toggle.display && callBack && collision(baseSize)(targetPosition)) {
          callBack();
          callBack = null;
        }
      };
      const render = () => {
        adjustedPoints = mapList(placedPoints, perspective2d);

        if(!toggle.display) {
          return;
        }

        fillOval(
          baseColor,
          [0, 0],
          adjustedPoints,
        );

        const rippleScale = (Date.now() + offset) % interval / speed;

        strokeOval(
          { style: shoreColor, thickness: 1 },
          [0, 0],
          mapList(
            addListSet(
              scaleList(
                basePoints,
                rippleScale > 1
                  ? 0
                  : rippleScale
              ),
              position
            ),
            perspective2d,
          ),
        );

        strokeOval(
          { style: shoreColor, thickness: 2 },
          [0, 0],
          adjustedPoints,
        );

      };
      return {
        propCollision: collision(2 * baseSize),
        collision: collision(baseSize * 0.5),
        test,
        render,
        toggle,
      };
    };

export const makeAvengerPool = createPool(`#F9CDAD`, `#FE4365`); // Pink/gray
export const makeChildPool = createPool(`#EDE574`, `#F9D423`); // orange/yellow
export const makeProtectorPool = createPool(`#69D2E7`, `#E0E4CC`); // Blue
export const makePersecutorPool = createPool(`#CFF09E`, `#3B8686`); // Green
export const makeOriginalPool = createPool(`#EDEDF2`, `#CFD5E1`); // Gray/White
export const makeEvilPool = createPool(`#4F364C`, `#8F9E6F`); // Purple/Green
