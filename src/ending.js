import Movie from 'movie';
import Song from 'audio';
import autumn from 'songs/autumn';

const bgMusic = new Song(autumn);

export default {
  init: ()=> {
    bgMusic.play(`repeat`);
  },
  dismiss: ()=> {}
};
