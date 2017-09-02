import loop from 'loop';
import StatusBar from 'statusBar';
import BattleMap from 'map';
import state from 'state';
import { inputs } from 'controls';
import { subtractSet } from 'pura/vector/tuple';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { calcWorldPosition } from 'camera';
import { clear } from 'pura/canvas/tuple';

export default {
  init() {
    uiElements.push(BattleMap, StatusBar);
    state.logic = () => {
      if (inputs.click) {
        state.target = calcWorldPosition(inputs.mousePosition);
      } else {
        state.target = null
      }
    };
  },
  dismiss() { }
}
