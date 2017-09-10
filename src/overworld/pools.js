import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapList, addList, addListSet, subtract, scaleList, magnitudeSqr } from 'pura/vector/tuple';
import { fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective2d } from 'camera';

const createPool =
  (baseColor, shoreColor, waveColor) =>
    (baseSize, position, callBack, shouldDisplay = true) => {
      const offset = ((Math.random() * 500)) | 0;
      const interval = 1800 + ((Math.random() * 1000) | 0);
      const speed = baseSize * 12;
      const basePoints = getRectanglePoints(baseSize, baseSize);
      const placedPoints = addList(basePoints, position);
      let adjustedPoints;
      return {
        collision: (targetPosition)=>
          magnitudeSqr(subtract(targetPosition, position)) <= baseSize * baseSize,

        testCallback(targetPosition) {
          if(this.shouldDisplay && this.collision(targetPosition)) {
            if(callBack) {
              callBack();
              callBack = null;
            }
          }
        },
        shouldDisplay,
        render() {
          adjustedPoints = mapList(placedPoints, perspective2d);

          if(!this.shouldDisplay) {
            return;
          }

          fillOval(
            baseColor,
            [0, 0],
            adjustedPoints,
          );

          const rippleScale = (Date.now() + offset) % interval / speed;

          strokeOval(
            { style: waveColor, thickness: 1 },
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

        }
      };
    };

export const makeAvengerPool = createPool(`#c05858`, `#9c2020`, `#fcb4b4`);
export const makeChildPool = createPool(`#EDE574`, `#F9D423`, `#E1F5C4`);
export const makeProtectorPool = createPool(`#00B4CC`, `#005F6B`, `#00DFFC`);
export const makePersecutorPool = createPool(`#8F9A9C`, `#65727A`, `#BEC3BC`);
export const makeOriginalPool = createPool(`#EDEDF2`, `#CFD5E1`, `#FCFDFF`);
export const makeEvilPool = createPool(`#4F364C`, `#8F9E6F`, `#B1CF72`);
