import { getNearbyAllies } from 'battle/grid';
import Hunt from 'battle/actions/Hunt';
import AIMagic from 'battle/actions/AIMagic';

export default function* Vamp(character) {
  const [{ abilities: { aiMagic: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) {
    yield* AIMagic(character, nearbyGoodGuys);
  } else {
    yield* Hunt(character);
  }
  yield;
}
