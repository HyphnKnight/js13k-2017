import { createRectangle } from 'pura/geometry/tuple';
import { viewWidth, viewHeight } from 'dom';
import { playSong, stopSong } from 'audio';
import canond from 'songs/canond';
import { inputs } from 'controls';
import state from 'state';
import { uiElements } from 'ui';
import Scene from 'scene';
import overworld from 'overworld';
import Movie from 'movie';
import titleMovie, { endTitle } from 'movies/title';

let skipped = false;

const skipTitle = ()=> {
  if(skipped) {
    Scene(overworld);
    return;
  }

  skipped = true;

  title.children.length = 0;
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

export default {
  init: () => {
    uiElements.push(title);
    playSong(canond);
    state.logic = null;
  },
  dismiss: () => stopSong(),
};
