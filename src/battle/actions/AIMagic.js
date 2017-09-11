import mergeSort from 'pura/array/mergeSort';
import PanCameraTo from 'battle/actions/PanCameraTo';

export default function* AIAttack(character, nearbyGoodGuys) {
  const [{ type, abilities: { aiMagic: { effect } } }] = character;
  console.log(`1) Detect & Display possible attackers`);
  const target = mergeSort(nearbyGoodGuys, ([, health]) => health)[0];
  console.log(`2) Inflict damage on target`);
  const [tData, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({
    type: type === tData.type
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(target[2]);
  console.log(`4) Play animation`);
  yield;
}
