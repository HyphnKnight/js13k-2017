import loop from 'loop';
import StatusBar from 'statusBar';
import { map } from 'map';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { clear } from 'pura/canvas/tuple';

let stopLoop;

export default {
  init() {
    uiElements.push(StatusBar);
    stopLoop = loop(dt => {
      clear();
      renderUI();
    });
  },
  dismiss() {
    stopLoop();
  }
}
