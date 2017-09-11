const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startTime = Date.now();
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

async function playNote(note, length) {
  if(note === ``) return await wait(length * 1000 * 0.75);

  const gainNode = context.createGain();
  gainNode.gain.value = 1.1 - Math.min(1, (Date.now() - startTime) / 3000);

  const oscillator = context.createOscillator();
  oscillator.type = `square`;
  oscillator.frequency.value = note;
  oscillator.onended = ()=> {
    oscillator.disconnect();
    gainNode.disconnect();
  };

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(0);

  gainNode.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + length
  );

  oscillator.stop(context.currentTime + length);

  await wait(length * 1000 * 0.75);
}

export default class Song {
  constructor(music) {
    this.music = music;
    this.stopped = false;
  }
  async play(repeat) {
    this.stopped = false;

    let i = -1;
    let h = -1;
    while(!this.stopped && ++i < this.music.length) {
      const [note, length] = this.music[i];
      if(Array.isArray(note)) {
        while(++h < note.length - 1) {
          playNote(note[h], Array.isArray(length) ? length[h] : length);
        }
        playNote(note[h], Array.isArray(length) ? length[h] : length);
        await wait((Array.isArray(length) ? Math.min(...length) : length) * 1000 * 0.75);
        h = -1;
      } else {
        await playNote(note, length);
      }
    }

    if(!this.stopped && repeat) {
      return await this.play(repeat);
    }

    return await true;
  }

  stop() {
    this.stopped = true;
  }
}
