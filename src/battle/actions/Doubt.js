import { getNearbyAllies } from 'battle/grid';
import AIAttack from 'battle/actions/AIAttack';

export default function* Doubt(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range).filter(
    ([, , , statuses]) => statuses.find(({ type }) => type === `damage`)
  );
  if(nearbyGoodGuys.length) {
    yield* AIAttack(character, nearbyGoodGuys);
  }
  yield;
}
