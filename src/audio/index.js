const context = new AudioContext();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startTime = Date.now();

export let stopPlayingAudio = false;

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

export const playSong = async (music)=> {
  stopPlayingAudio = false;

  let i = -1;
  let h = -1;
  while(!stopPlayingAudio && ++i < music.length) {
    const [note, length] = music[i];
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
  return await true;
};

export const stopSong = () => {
  stopPlayingAudio = true;
};
