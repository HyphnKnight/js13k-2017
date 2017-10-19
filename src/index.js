import titlescreen from './titlescreen.js';
import Scene from './scene.js';
import state from './state.js';
import loop from './loop.js';
import { updateInputs } from './controls.js';
import { render } from './ui.js';
import { clear } from 'pura/canvas/tuple';
import Shader from './shaderRounding.js';

Scene(titlescreen);

loop((dt) => {
  clear();
  state.logic && state.logic();
  render(dt);
  updateInputs();
  Shader();
});
