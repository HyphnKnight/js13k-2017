import { createRectangle } from 'pura/geometry/tuple';
import { viewWidth, viewHeight } from 'dom';
import Song from 'audio';
import canond from 'songs/canond';
import { inputs } from 'controls';
import state from 'state';
import { uiElements } from 'ui';
import Scene from 'scene';
import overworld from 'overworld';
import Movie from 'movie';
import titleMovie, { endTitle } from 'movies/title';
import intro from 'movies/intro';

let skipped = false,
    inIntro = false;

const skipTitle = ()=> {
  if(skipped) {
    if(!inIntro) {
      inIntro = true;

      title.children = [Movie(0, 0, viewWidth, viewHeight, intro, ()=> {
        Scene(overworld);
      })];
    }

    return;
  }

  skipped = true;

  title.children.splice(0, title.children.length);
  endTitle();
  title.children.push(Movie(
    0, 0, viewWidth, viewHeight, titleMovie
  ));
};

const title = {
  geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

  children: [Movie(
    0, 0, viewWidth, viewHeight, titleMovie, ()=> {
      skipped = true;
    }
  )],

  render() {
    if((inputs.space === 1 || inputs.return === 1)) {
      skipTitle();
    }
  },
  interact: {
    onMouseDown: skipTitle
  }
};

const bgMusic = new Song(canond);

export default {
  init: () => {
    uiElements.push(title);
    bgMusic.play();
    state.logic = null;
  },
  dismiss: () => bgMusic.stop(),
};
