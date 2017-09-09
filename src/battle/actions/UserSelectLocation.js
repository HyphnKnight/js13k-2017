import { contains, clear } from 'pura/array';
import { inputs } from 'controls';
import { controlCamera } from 'camera';
import state from 'state';
import { getGridHexFromClick, optionHexes } from 'battle/grid';

export default function* UserSelectLocation(options) {
  console.log(`UserSelectLocation`);
  let selectedLocation = null;
  state.target = null;
  console.log(`UserSelectLocation: Set Options`);
  clear(optionHexes);
  optionHexes.push(...options);
  console.log(`UserSelectLocation: Wait for input`);
  while(!selectedLocation) {
    controlCamera();
    const { click, mousePosition } = inputs;
    if(click === 1) {
      state.target = getGridHexFromClick(mousePosition);
      if(contains(options, state.target)) selectedLocation = state.target;
    }
    yield;
  }
  clear(optionHexes);
  console.log(`UserSelectLocation: Done`);
  return selectedLocation;
}
