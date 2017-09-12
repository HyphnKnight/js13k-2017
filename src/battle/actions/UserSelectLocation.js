import { contains, clear } from 'pura/array';
import { inputs } from 'controls';
import { controlCamera } from 'camera';
import state from 'state';
import { getGridHexFromClick, optionHexes } from 'battle/grid';

export default function* UserSelectLocation(options) {
  let selectedLocation = null;
  state.target = null;
  clear(optionHexes);
  optionHexes.push(...options);
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
  return selectedLocation;
}
