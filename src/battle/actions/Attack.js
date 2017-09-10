import {
  getCharacterAtHex,
  getNearbyEnemies,
  getGridHexFromVector2d,
} from 'battle/grid';
import { dealDamage } from 'battle/actions/utility';
import UserSelectLocation from 'battle/actions/UserSelectLocation';
import PanCameraTo from 'battle/actions/PanCameraTo';

export default function* Attack(character) {
  const [{ abilities: { attack: { damage, range } } }, , position] = character;
  console.log(`1) Detect & Display possible attackers`);
  const selectedLocation = yield* UserSelectLocation(
    getNearbyEnemies(position, range).map(([, , position]) => getGridHexFromVector2d(position))
  );
  console.log(`1b) If none display warning text ( there are no nearby enemies) and prompt a reselection`);
  console.log(`2) Wait for player to select target`);
  console.log(`3) Inflict damage on target`);
  const target = getCharacterAtHex(selectedLocation);
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
  console.log(`4) Play animation`);
  return;
}
