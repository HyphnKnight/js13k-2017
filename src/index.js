import titleScreen from 'titlescreen';
import Scene from 'scene';
import state from 'state';
import loop from 'loop';
import { updateInputs } from 'controls';
import { render } from 'ui';
import { clear } from 'pura/canvas/tuple';

Scene(titleScreen);

loop((dt) => {
  clear();
  state.logic && state.logic();
  render(dt);
  updateInputs();
});
