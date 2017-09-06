import * as note from 'notes';

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

async function playSong(music) {
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
}

export const playCanonD = async () => await playSong([

  // line 1
  [[note.E4, note.C4], 1],
  [[note.D4, note.G3], 1],

  [[note.C4, note.A3], 1],
  [[note.B3, note.E3], 1],

  [[note.A3, note.F3], 1],
  [[note.G3, note.C3], 1],

  [[note.A3, note.F3], 1],
  [[note.B3, note.G3], 1],

  // line 2
  [[note.E6, note.G5, note.C5], 1],
  [[note.D6, note.B5, note.G4], 1],

  [[note.C6, note.A4], 1],
  [[note.B5, note.G5, note.E4], 1],

  [[note.A5, note.C5, note.F4], 1],
  [[note.G5, note.E5, note.C4], 1],

  [[note.A5, note.F5, note.F4], 1],
  [[note.B5, note.D5, note.G4], 1],

  // line 3
  [[note.C5, note.C4, note.E4], [0.5, 1, 1]],
  [note.C5, 0.5],
  [[note.D5, note.D4, note.G3], [0.5, 1, 1]],
  [note.B4, 0.5],

  [[note.C5, note.E4, note.A4], [0.5, 1, 1]],
  [note.E5, 0.5],
  [[note.G5, note.E3], [0.5, 1, 1]],
  [note.G4, 0.5],

  [[note.A4, note.A3, note.F3], [0.5, 1, 1]],
  [note.F4, 0.5],
  [[note.E4, note.C3], [0.5, 1, 1]],
  [note.G4, 0.5],

  [[note.F4, note.A3, note.F3], [0.5, 1, 1]],
  [note.C5, 0.5],
  [[note.B4, note.B3, note.G3], [0.5, 1, 1]],
  [note.G4, 0.5],

  // line 4
  [[note.C4, note.E3, note.C3], [0.5, 1, 1]],
  [note.E4, 0.25],
  [note.G4, 0.25],
  [[note.G4, note.G2], [0.25, 1, 1]],
  [note.A4, 0.25],
  [note.G4, 0.25],
  [note.F4, 0.25],

  [[note.E4, note.A2, note.C3], [0.75, 1, 1]],
  [note.E4, 0.25],
  [[note.E4, note.G2, note.E2], [0.25, 1, 1]],
  [note.F4, 0.25],
  [note.E4, 0.25],
  [note.D4, 0.25],

  [[note.C4, note.A2, note.F2], [0.25, 1, 1]],
  [note.Bb3, 0.25],
  [note.A3, 0.25],
  [note.B3, 0.25],
  [[note.G3, note.E2, note.C2], [0.5, 1, 1]],
  [note.note.E3, 0.5],

  [[note.C3, note.A2, note.F2], [0.5, 1, 1]],
  [note.F3, 0.25],
  [note.E3, 0.25],
  [[note.D3, note.B2, note.G2], [0.5, 1, 1]],
  [note.G3, 0.25],
  [note.F3, 0.25],


  // line 5
  [[``, note.E4, note.C4], [0.5, 1, 1]],
  [note.C5, 0.5],
  [[note.D5, note.G3], [0.5, 1, 1]],
  [note.B4, 0.5],

  [[note.C5, note.C4, note.A3], [0.5, 1, 1]],
  [note.E4, 0.5],
  [[note.G4, note.B3, note.E3], [0.75, 1, 1]],
  [note.A4, 0.25],

  [[note.F4, note.A3, note.F3], [0.5, 1, 1]],
  [note.C4, 0.5],
  [[note.E4, note.G3, note.C3], [0.5, 1, 1]],
  [note.G4, 0.5],

  [[note.F4, note.A3, note.F3], [0.5, 1, 1]],
  [note.E4, 0.5],
  [[note.D4, note.B3, note.G3], [0.5, 1, 1]],
  [note.G4, 0.5],

  [[note.E4, note.C4, note.C3], [2, 2, 2]],

]);

export const stopCanonD = () => {
  stopPlayingAudio = true;
};
