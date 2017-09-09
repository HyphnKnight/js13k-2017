const context = new AudioContext();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startTime = Date.now();

async function playNote(note, length) {
  if(note === ``) return await wait(length * 1000 * 0.75);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  gain.gain.value = 1.1 - Math.min(1, (Date.now() - startTime) / 3000);

  oscillator.connect(gain);

  oscillator.type = `square`;
  oscillator.frequency.value = note;
  gain.connect(context.destination);
  oscillator.start(0);

  gain.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + length
  );

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
      this.play(this.music, repeat);
    }

    return await true;
  }

  stop() {
    this.stopped = true;
  }
}
