import { mapList, mapListSet, addList, addListSet, scaleList } from 'pura/vector/tuple';
import { getRectanglePoints } from 'pura/geometry/tuple';
import { perspective2d } from '../camera.js';
import { isPointInCircle } from 'pura/intersection/tuple';

export const islands = [];

const addIslandPiece = (position, radius) => {
  const basePoints = getRectanglePoints(radius * 2, radius * 2);
  const adjustedPoints = addList(basePoints, position);
  islands.push({
    position, radius,
    getBase: () => mapList(adjustedPoints, perspective2d),
    getShoreLine: (scale) => mapListSet(addListSet(scaleList(basePoints, scale), position), perspective2d),
    collision: (point, scale = 1) => isPointInCircle(point, position, radius * scale),
  });
};

let xOffset = -1;
let yOffset = -1;
while(++xOffset < 9) {
  const newOffset = Math.abs(xOffset - 4);
  const len = 9 - newOffset;
  while(++yOffset < len) {
    addIslandPiece(
      [(xOffset - 5) * 100, 1000 + (newOffset / 2 + yOffset - 5) * 100],
      75 + Math.random() * 50
    );
  }
  yOffset = 0;
}





// export const isOnIsland =
//   ([x, y]) => sands.


