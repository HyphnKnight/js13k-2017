import { getRectanglePoints } from 'pura/geometry/tuple';
import { mapList, addList, addListSet, scaleList } from 'pura/vector/tuple';
import { fillOval, strokeOval } from 'pura/canvas/tuple';
import { perspective2d } from 'camera';

const baseSize = 400;
const offset = Math.floor(Math.random() * 500);
const interval = 1800 + Math.floor(Math.random() * 1000);
const speed = baseSize * 12;
const basePoints = getRectanglePoints(baseSize, baseSize);
let adjustedPoints;

export const drawPool =
  () => {
    adjustedPoints = mapList(placedPoints, perspective2d);

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

  };
