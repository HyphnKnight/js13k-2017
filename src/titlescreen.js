import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText, fillPolygon, clear } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';
import { playCanonD, stopCanonD } from 'audio';
import { inputs } from 'controls';
import { title_text, base_text, white, black } from 'style';
import { gem } from 'emoji';
import state from 'state';
import loop from 'loop';
import { render as renderUI, uiElements } from 'ui';
import Scene from 'scene';
import overworld from 'overworld';
import Movie from 'movie';
import titleMovie from 'movies/title';

let animationStart = null;
let animState = 0;
let animTime = 0;
let pressed = false;

// const headerStyle = { textBaseline: `middle`, style: `white`, font: title_text, horizontalAlign: true };
const gemStyle = { textBaseline: `middle`, style: `white`, font: title_text };
const textStyle = { style: `white`, font: base_text, horizontalAlign: true };

const title = {
  geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),
  render: () => {

    if(!animationStart) {
      animationStart = Date.now();
      playCanonD();
    }

    animTime = Date.now() - animationStart;
    animState = Math.min(animTime / 24000, 1);

    fillText(
      gemStyle,
      [
        animTime / 24000 > 1 ? -11 : (Math.abs(((animTime - 1500) % 6000 / 600) - 5) - 2.5) * 10 - 11,
        viewHeight - Math.min(animTime / 24000, 1) * viewHeight * 1.125,
      ],
      gem
    );

    // fillText(
    //   headerStyle,
    //   [0, -viewHeight / 2 + Math.min(animState * 2, 1) * viewHeight / 2],
    //   `A L T E R`
    // );

    if(animTime > 24500) {
      ctx.font = base_text;
      fillText(textStyle, [0, 48], `new game`);
      (Date.now() % 600 > 400) && fillPolygon(`white`, [-42, 44], [-5, 3, 5, 0, -5, -3]);
    }
    if(!pressed && (inputs.space || inputs.return) && animState < 1) animationStart /= 2;
    else if(!pressed && (inputs.space || inputs.return)) Scene(overworld);
    pressed = (inputs.space || inputs.return);
  },
  interact: {
    onMouseDown() {
      if(animState < 1) animationStart /= 2;
      else Scene(overworld);
    }
  }
};

export default {
  init: () => {
    animationStart = null;
    uiElements.push(title);
    uiElements.push(Movie(
      0,0,viewWidth,viewHeight,titleMovie
    ));
    state.logic = null;
  },
  dismiss: () => stopCanonD(),
};
