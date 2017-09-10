import { getNearbyAllies } from 'battle/grid';
import Swarm from 'battle/actions/Swarm';
import AIAttack from 'battle/actions/AIAttack';

export default function* Swarmer(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) {
    yield* AIAttack(character, nearbyGoodGuys);
  } else {
    yield* Swarm(character);
  }
  yield;
}
