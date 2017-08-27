import loop from 'loop';
import { render as renderUI, palette } from 'ui';
import { render as renderGraphics } from 'overworld/graphics';
import logic from 'overworld/logic';

let stopLoop;

export default {
  init: ()=> {
    stopLoop = loop(dt => {
      // Logic
      logic.init(dt);

      // Graphics
      palette.clear();

      renderGraphics();
      renderUI();
    });
  },
  dismiss: ()=> {
    stopLoop();
  }
};
