import { getNearbyAllies, getNearbyEnemies } from 'battle/grid';
import AIAttack from 'battle/actions/AIAttack';
import AIDefend from 'battle/actions/AIDefend';
import AIMagic from 'battle/actions/AIMagic';
import Swarm from 'battle/actions/Swarm';

export default function* Deceit(character) {
  const [{ abilities: { aiAttack: { range }, aiMagic: { range: magRange } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  const dotHotable = [...getNearbyAllies(position, magRange), ...getNearbyEnemies(position, magRange)];
  if(nearbyGoodGuys.length > 1) {
    yield* AIAttack(character, nearbyGoodGuys);
  } else if(nearbyBadGuys.length > 1) {
    yield* AIDefend(character, nearbyBadGuys);
  } else if(dotHotable.length) {
    yield* AIMagic(character, [...nearbyGoodGuys, ...nearbyBadGuys]);
  } else {
    yield* Swarm(character);
  }
  yield;
}
