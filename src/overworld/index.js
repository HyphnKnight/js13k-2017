import loop from 'loop';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { clear } from 'pura/canvas/tuple';
import { subtractSet } from 'pura/vector/tuple';
import state from 'state';
import { Dialog } from 'dialog';
import { render as renderGraphics } from 'overworld/graphics';
import logic, { avngSprite } from 'overworld/logic';
import { calcWorldPosition } from 'camera';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';

let stopLoop;

const calcMousePosition =
  ({ clientX, clientY, touches }) =>
    touches
      ? ([touches[0].clientX, touches[0].clientY])
      : ([clientX, clientY]);

let moveTo;
const evtMouseDown = (e)=> (moveTo = e);
const evtMouseMove = (e)=> moveTo && (moveTo = e);
const evtMouseUp = ()=> (moveTo = false);

export default {
  init: () => {
    uiElements.push(Dialog);
    state.logic = (dt) => {
      // Logic
      logic(dt);
      renderGraphics(dt);
      // Input
      if (moveTo) {
        const position = subtractSet(calcMousePosition(moveTo), [canvasOffsetLeft, canvasOffsetTop]);
        position[0] *= scaleX;
        position[1] *= scaleY;
        state.target = calcWorldPosition(position);
      }
    };

    window.addEventListener(`mousedown`, evtMouseDown);
    window.addEventListener(`mousemove`, evtMouseMove);
    window.addEventListener(`mouseup`, evtMouseUp);
  },
  dismiss: () => {
    window.removeEventListener(`mousedown`, evtMouseDown);
    window.removeEventListener(`mousemove`, evtMouseMove);
    window.removeEventListener(`mouseup`, evtMouseUp);
  },
};
