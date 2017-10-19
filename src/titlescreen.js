import { createRectangle } from 'pura/geometry/tuple';
import { fillRectangle, fillPolygon, fillText } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from './dom.js';
import { gem } from './emoji.js';
// import Song from 'audio';
// import canond from 'songs/canond';
import { inputs } from './controls.js';
import { title_text, base_text, white } from './style.js';
import state from './state.js';
import { uiElements } from './ui.js';
import Scene from './scene.js';
import overworld from './overworld/index.js';
// import Movie from 'movie';
// import titleMovie, { endTitle } from 'movies/title';
// import intro from 'movies/intro';

// let skipped = false;
// inIntro = false;

const skipTitle = ()=> {
  // if(skipped) {
  // if(!inIntro) {
  // inIntro = true;

  // bgMusic.stop();
  // title.children = [Movie(0, 0, viewWidth, viewHeight, intro, ()=> {
  Scene(overworld);
  // })];
  // }

  // return;
  // }

  // skipped = true;

  // title.children.splice(0, title.children.length);
  // endTitle();
  // title.children.push(Movie(
  // 0, 0, viewWidth, viewHeight, titleMovie
  // ));
};

const bigText = {
  textBaseline: `middle`,
  style: white,
  font: title_text,
  horizontalAlign: true
};

const title = {
  geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

  // children: [Movie(
  //   0, 0, viewWidth, viewHeight, titleMovie, ()=> {
  //     skipped = true;
  //   }
  // )],

  render() {
    if(inputs.space === 1 || inputs.return === 1) {
      skipTitle();
    }

    fillRectangle(
      `#00f`,
      [0, 0],
      viewWidth,
      viewHeight,
      0,
    );

    fillText(bigText, [0,0], `A L T E R`);
    fillText(bigText, [0,-24], gem);
    fillText({ style: white, font: base_text }, [-28,51], `new game`);
    (Date.now() % 600 > 400) && fillPolygon(`white`, [-42, 48], [-5, 3, 5, 0, -5, -3]);
  },
  interact: {
    onMouseDown: skipTitle
  }
};

// const bgMusic = new Song(canond);

export default {
  init: () => {
    uiElements.push(title);
    // bgMusic.play();
    state.logic = null;
  },
  dismiss: () => {}//bgMusic.stop(),
};
