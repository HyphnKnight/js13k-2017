import { uiElements } from '../ui.js';
// import Song from 'audio';
// import overworldTheme from 'songs/overworld';
import state from '../state.js';
import Dialog from '../dialog.js';
import { inputs } from '../controls.js';
import { render as renderGraphics } from './graphics.js';
import logic from './logic.js';
import { calcWorldPosition } from '../camera.js';

// const bgMusic = new Song(overworldTheme);

export default {
  init: () => {
    // bgMusic.play(`repeat`);
    uiElements.push(Dialog);
    state.logic = (dt) => {
      // Logic
      logic(dt);
      renderGraphics(dt);
      // Input
      if(inputs.click && !state.dialog.length) {
        state.target = calcWorldPosition(inputs.mousePosition);
      }
    };
  },
  dismiss: () => {
    // bgMusic.stop();
  },
};
