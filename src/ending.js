import { viewWidth, viewHeight } from 'dom';
import { uiElements } from 'ui';
import Movie from 'movie';
import Song from 'audio';
import autumn from 'songs/autumn';
import endingMovie from 'movies/ending';

const bgMusic = new Song(autumn);

export default {
  init: ()=> {
    bgMusic.play(`repeat`);
    uiElements.push(Movie(0, 0, viewWidth, viewHeight, endingMovie));
  },
  dismiss: ()=> {}
};
