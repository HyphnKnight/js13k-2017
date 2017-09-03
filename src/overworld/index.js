import loop from 'loop';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { clear } from 'pura/canvas/tuple';
import { subtractSet } from 'pura/vector/tuple';
import state from 'state';
import { Dialog } from 'dialog';
import { inputs } from 'controls';
import { render as renderGraphics } from 'overworld/graphics';
import logic from 'overworld/logic';
import { calcWorldPosition } from 'camera';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';

export default {
  init: () => {
    uiElements.push(Dialog);
    state.logic = (dt) => {
      // Logic
      logic(dt);
      renderGraphics(dt);
      // Input
      if (inputs.click) {
        state.target = calcWorldPosition(inputs.mousePosition);
      }
    };
  },
  dismiss: () => { },
};
