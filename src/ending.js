import { viewWidth, viewHeight } from './dom.js';
import { uiElements } from './ui.js';
import state from './state.js';
import Movie from './movie.js';
// import Song from 'audio';
// import autumn from 'songs/autumn';
import endingMovie from './movies/ending.js';

// const bgMusic = new Song(autumn);

export default {
  init: ()=> {
    // bgMusic.play(`repeat`);
    state.logic = null;
    uiElements.push(Movie(0, 0, viewWidth, viewHeight, endingMovie));
  },
  dismiss: ()=> {}
};
