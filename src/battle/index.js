import loop from 'loop';
import StatusBar from 'statusBar';
import BattleMap from 'map';
import state from 'state';
import { subtractSet } from 'pura/vector/tuple';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { calcWorldPosition } from 'camera';
import { clear } from 'pura/canvas/tuple';

let stopLoop;

const calcMousePosition =
  ({ clientX, clientY, touches }) =>
    touches
      ? ([touches[0].clientX, touches[0].clientY])
      : ([clientX, clientY]);

export default {
  init() {
    uiElements.push(BattleMap, StatusBar);
    stopLoop = loop(dt => {
      clear();
      renderUI();
    });
    window.addEventListener('click', (evt) => {
      const position = subtractSet(calcMousePosition(evt), [canvasOffsetLeft, canvasOffsetTop]);
      position[0] *= scaleX;
      position[1] *= scaleY;
      state.target = calcWorldPosition(position);
    });
  },
  dismiss() {
    stopLoop();
  }
}
