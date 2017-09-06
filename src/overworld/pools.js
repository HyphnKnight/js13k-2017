import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapList, addList, addListSet, subtract, scaleList, magnitudeSqr } from 'pura/vector/tuple';
import { fillOval, strokeOval } from 'pura/canvas/tuple';
import { calcScreenPosition2d } from 'camera';

const createPool =
  (baseColor, shoreColor, waveColor) =>
    (baseSize, position, callBack) => {
      const offset = Math.floor(Math.random() * 500);
      const interval = 1800 + Math.floor(Math.random() * 1000);
      const speed = baseSize * 12;
      const basePoints = getRectanglePoints(baseSize, baseSize);
      const placedPoints = addList(basePoints, position);
      let adjustedPoints;
      return {
        collision: (targetPosition) =>
          magnitudeSqr(subtract(targetPosition, position)) <= baseSize * baseSize
            ? callBack()
            : null,
        render() {
          adjustedPoints = mapList(placedPoints, calcScreenPosition2d);

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
              calcScreenPosition2d,
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

