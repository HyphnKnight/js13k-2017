import loop from 'loop';
import { render as renderUI } from 'ui';
import { clear } from 'pura/canvas/tuple';
import { render as renderGraphics } from 'overworld/graphics';
import logic from 'overworld/logic';

let stopLoop;

export default {
  init: ()=> {
    stopLoop = loop(dt => {
      // Logic
      logic.init(dt);

      // Graphics
      clear();

      renderGraphics();
      renderUI();
    });
  },
  dismiss: ()=> {
    stopLoop();
  }
};
