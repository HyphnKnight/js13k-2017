import mergeSort from 'pura/array/mergeSort';
import {
  getNearbyAllies,
  // getMovementOptions,
  getPathToTarget,
  getGridHexFromVector2d,
} from 'battle/grid';
// import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';
import MoveCharacterOnPath from 'battle/actions/MoveCharacterOnPath';

export default function* Hunt(character) {
  const [{ abilities: { hunt: { range } } }, , position] = character;
  console.log(`1) Move Camera to enemy`);
  yield* PanCameraTo(position);
  console.log(`2) Fetch all good units`);
  console.log(`3) Sort by which one has the most enemies surrounding them`);
  console.log(`4) Break tie by which is closest`);
  const goodGuys = mergeSort(
    getNearbyAllies(position, 10),
    ([, , aPosition]) => getNearbyAllies(aPosition, 1).length
  );
  console.log(`5) Fetch fastest path to target`);
  const [, , tPosition] = goodGuys[0];
  const path = getPathToTarget(
    getGridHexFromVector2d(position),
    getGridHexFromVector2d(tPosition)
  ).splice(0, range + 1);
  path.pop();
  console.log(`6) Move character while tracking with camera`);
  yield* MoveCharacterOnPath(position, path);
}
