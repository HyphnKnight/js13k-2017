import mergeSort from 'pura/array/mergeSort';
import PanCameraTo from 'battle/actions/PanCameraTo';

export default function* AIDefend(character, nearbyEnemies) {
  const [{ abilities: { aiDefend: { duration, percentage } } }] = character;
  console.log(`1) Detect & Display possible attackers`);
  const target = mergeSort(nearbyEnemies, ([, health]) => -health)[0];
  console.log(`2) Inflict damage on target`);
  const [, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({
    type: `shield`,
    duration,
    percentage,
  });
  yield* PanCameraTo(target[2]);
  console.log(`4) Play animation`);
  yield;
}
