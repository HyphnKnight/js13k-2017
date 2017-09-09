import { clear } from 'pura/array';
import {
  getMovementOptions,
  getPathToTarget,
  getGridHexFromVector2d,
  optionHexes,
} from 'battle/grid';
import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';
import MoveCharacterOnPath from 'battle/actions/MoveCharacterOnPath';

export default function* Move(character) {
  console.log(`Action:Move`);
  const [{ abilities: { move: { range } } }, , position] = character;
  const positionHex = getGridHexFromVector2d(position);
  console.log(`1) Detect & Display Possible Movement Spaces`);
  clear(optionHexes);
  optionHexes.push(...getMovementOptions(positionHex, range));
  console.log(`2) Wait for player to select their chosen movement space`);
  const selectedLocation = yield* UserSelectLocation(getMovementOptions(positionHex, range));
  console.log(`3) Calculate Character Path`);
  const path = getPathToTarget(positionHex, selectedLocation);
  console.log(`4) Move Camera To Player`);
  yield* PanCameraTo(position);
  console.log(`5) Move Player While Tracking Camera`);
  yield* MoveCharacterOnPath(position, path);
}
