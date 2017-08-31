import loop from 'loop';
import { render as renderUI } from 'ui';
import { clear } from 'pura/canvas/tuple';
import { subtractSet } from 'pura/vector/tuple';
import state from 'state';
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

const onClick = (e) => {
  const position = subtractSet(calcMousePosition(e), [canvasOffsetLeft, canvasOffsetTop]);
  position[0] *= scaleX;
  position[1] *= scaleY;
  state.target = calcWorldPosition(position);
};

export default {
  init: () => {
    stopLoop = loop(dt => {
      // Logic
      logic(dt);

      // Graphics
      clear();

      renderGraphics();
      renderUI();
    });
    window.addEventListener('click', onClick);
  },
  dismiss: () => {
    stopLoop();
    window.addEventListener('click', onClick);
  }
};
