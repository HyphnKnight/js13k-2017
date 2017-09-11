import { getNearbyAllies, getNearbyEnemies } from 'battle/grid';
import Swarm from 'battle/actions/Swarm';
import AIAttack from 'battle/actions/AIAttack';

export default function* Resentment(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  if(nearbyGoodGuys.length === 0) {
    yield* Swarm(character);
  } else {
    yield* AIAttack(character, [...nearbyBadGuys, ...nearbyGoodGuys]);
  }
  yield;
}
