import { dealDamage } from 'battle/actions/utility';
import mergeSort from 'pura/array/mergeSort';
import PanCameraTo from 'battle/actions/PanCameraTo';

export default function* AIAttack(character, nearbyGoodGuys) {
  const [{ abilities: { aiAttack: { damage } } }] = character;
  console.log(`1) Detect & Display possible attackers`);
  const target = mergeSort(nearbyGoodGuys, ([, health]) => health)[0];
  console.log(`2) Inflict damage on target`);
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
  console.log(`4) Play animation`);
  yield;
}
