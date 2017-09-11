import { getNearbyAllies, getNearbyEnemies } from 'battle/grid';
import Hunt from 'battle/actions/Hunt';
import AIDefend from 'battle/actions/AIDefend';
import AIAttack from 'battle/actions/AIAttack';

export default function* Skeli(character) {
  const [{ abilities: { aiMagic: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  if(nearbyGoodGuys.length === 0) {
    yield* Hunt(character);
  } else if(nearbyBadGuys.length > nearbyGoodGuys.length) {
    yield* AIDefend(character, nearbyBadGuys);
  } else {
    yield* AIAttack(character, nearbyGoodGuys);
  }
  yield;
}
