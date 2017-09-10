import {
  getCharacterAtHex,
  getNearbyEnemies,
  getGridHexFromVector2d,
} from 'battle/grid';
import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';

export default function* Item(character) {
  const [{ type, abilities: { item: { effect, range } } }, , position] = character;
  console.log(`1) Give the option to select for different abilities`);
  const actions = Object.keys(data.abilities).map(name => action[name](character));
  // 4) Add actions to the menu
  menuUIIndex = uiElements.push(Menu(actions));
  // 5) Wait for player to select an action.
  while(!selectedAction) yield;
  uiElements.splice(menuUIIndex - 1, 1);
  console.log(`2)`);
  // const [{ type, abilities: { magic: { effect, range } } }, , position] = character;
  // console.log(`1) Detect & Display all eligible characters`);
  // console.log(`2) Select Target Character`);
  // const selectedLocation = yield* UserSelectLocation(
  //   getNearbyEnemies(position, range).map(([, , position]) => getGridHexFromVector2d(position))
  // );
  // const selectedTarget = getCharacterAtHex(selectedLocation);
  // console.log(`3a) Apply Heal over time to ally`);
  // console.log(`3b) Apply Damage over time to enemy`);
  // const [tData, , tPosition, tStatus] = selectedTarget;
  // yield* PanCameraTo(tPosition);
  // tStatus.push({
  //   type: type === tData.type
  //     ? `heal`
  //     : `damage`,
  //   effect,
  // });
  // console.log(`4) Play Animation`);
}
