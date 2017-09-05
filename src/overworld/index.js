import { uiElements } from 'ui';
import state from 'state';
import { Dialog } from 'dialog';
import { inputs } from 'controls';
import { render as renderGraphics } from 'overworld/graphics';
import logic from 'overworld/logic';
import { calcWorldPosition } from 'camera';

export default {
  init: () => {
    uiElements.push(Dialog);
    state.logic = (dt) => {
      // Logic
      logic(dt);
      renderGraphics(dt);
      // Input
      if(inputs.click) {
        state.target = calcWorldPosition(inputs.mousePosition);
      }
    };
  },
  dismiss: () => { },
};
