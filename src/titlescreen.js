import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText, fillPolygon, clear } from 'pura/canvas/tuple';
import { canvas } from 'dom';
import { playCanonD, stopCanonD } from 'audio';
import { inputs } from 'controls';
import { title_text, base_text, white, black } from 'style';
import { gem } from 'emoji';
import loop from 'loop';
import { render as renderUI, uiElements } from 'ui';
import Scene from 'scene';
import overworld from 'overworld';

let animationStart = null;
let animState = 0;
let animTime = 0;

const diamondAnimation = (animTime, height) => ([
  animTime / 24000 > 1
    ? -11
    : (Math.abs(((animTime - 1500) % 6000 / 600) - 5) - 2.5) * 10 - 11,
  height - Math.min(animTime / 24000, 1) * height * 1.125,
]);

const fontStyle = { textBaseline: `middle`, style: `white`, font: title_text, };

const title = {
  geometry: createRectangle([0, 0], 0, canvas.width, canvas.height),
  render: () => {

    if(!animationStart) {
      animationStart = Date.now();
      playCanonD();
    }

    animTime = Date.now() - animationStart;
    animState = Math.min(animTime / 24000, 1);

    fillText(
      fontStyle,
      [
        animTime / 24000 > 1 ? -11 : (Math.abs(((animTime - 1500) % 6000 / 600) - 5) - 2.5) * 10 - 11,
        canvas.height - Math.min(animTime / 24000, 1) * canvas.height * 1.125,
      ],
      gem
    );

    fillText(
      fontStyle,
      [-59, -canvas.height / 2 + Math.min(animState * 2, 1) * canvas.height / 2],
      `A L T E R`
    );

    if(animTime > 24500) {
      ctx.font = base_text;
      const { width } = ctx.measureText(`new game`);
      fillText({ style: `white`, font: base_text }, [-width / 2 - 2, 48], `new game`);
      (Date.now() % 600 > 400) && fillPolygon(`white`, [-42, 44], [-5, 3, 5, 0, -5, -3]);
    }

    if((inputs.space || inputs.return) && animState < 1) animationStart /= 2;
    else if(inputs.space || inputs.return) Scene(overworld);

  },
  interact: {
    onMouseDown() {
      if(animState < 1) animationStart /= 2;
      else Scene(overworld);
    }
  }
};

let stopLoop;

export default {
  init: () => {
    animationStart = null;
    uiElements.push(title);

    stopLoop = loop(dt => {
      // Graphics
      clear();

      renderUI();
    });
  },
  dismiss: () => {
    stopCanonD();
    const index = uiElements.indexOf(title);
    uiElements.splice(index, 1);
    stopLoop();
  }
};
