import overworld from 'overworld';
import battle from 'battle';
import Scene from 'scene';
import state from 'state';
import loop from 'loop';
import { updateInputs } from 'controls';
import { render } from 'ui';
import { clear } from 'pura/canvas/tuple';
import Shader from 'shaderRounding';

Scene(overworld);

setTimeout(() => battle, 300);

loop((dt) => {
  clear();
  state.logic && state.logic();
  render(dt);
  updateInputs();
  Shader();
});
