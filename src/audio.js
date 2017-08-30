const context = new AudioContext();

const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

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

// Notes
// These are free standing so that they can be optimized away.
const C0 = 16.35;
const Cs0 = 17.32;
const Db0 = 17.32;
const D0 = 18.35;
const Ds0 = 19.45;
const Eb0 = 19.45;
const E0 = 20.60;
const F0 = 21.83;
const Fs0 = 23.12;
const Gb0 = 23.12;
const G0 = 24.50;
const Gs0 = 25.96;
const Ab0 = 25.96;
const A0 = 27.50;
const As0 = 29.14;
const Bb0 = 29.14;
const B0 = 30.87;
const C1 = 32.70;
const Cs1 = 34.65;
const Db1 = 34.65;
const D1 = 36.71;
const Ds1 = 38.89;
const Eb1 = 38.89;
const E1 = 41.20;
const F1 = 43.65;
const Fs1 = 46.25;
const Gb1 = 46.25;
const G1 = 49.00;
const Gs1 = 51.91;
const Ab1 = 51.91;
const A1 = 55.00;
const As1 = 58.27;
const Bb1 = 58.27;
const B1 = 61.74;
const C2 = 65.41;
const Cs2 = 69.30;
const Db2 = 69.30;
const D2 = 73.42;
const Ds2 = 77.78;
const Eb2 = 77.78;
const E2 = 82.41;
const F2 = 87.31;
const Fs2 = 92.50;
const Gb2 = 92.50;
const G2 = 98.00;
const Gs2 = 103.83;
const Ab2 = 103.83;
const A2 = 110.00;
const As2 = 116.54;
const Bb2 = 116.54;
const B2 = 123.47;
const C3 = 130.81;
const Cs3 = 138.59;
const Db3 = 138.59;
const D3 = 146.83;
const Ds3 = 155.56;
const Eb3 = 155.56;
const E3 = 164.81;
const F3 = 174.61;
const Fs3 = 185.00;
const Gb3 = 185.00;
const G3 = 196.00;
const Gs3 = 207.65;
const Ab3 = 207.65;
const A3 = 220.00;
const As3 = 233.08;
const Bb3 = 233.08;
const B3 = 246.94;
const C4 = 261.63;
const Cs4 = 277.18;
const Db4 = 277.18;
const D4 = 293.66;
const Ds4 = 311.13;
const Eb4 = 311.13;
const E4 = 329.63;
const F4 = 349.23;
const Fs4 = 369.99;
const Gb4 = 369.99;
const G4 = 392.00;
const Gs4 = 415.30;
const Ab4 = 415.30;
const A4 = 440.00;
const As4 = 466.16;
const Bb4 = 466.16;
const B4 = 493.88;
const C5 = 523.25;
const Cs5 = 554.37;
const Db5 = 554.37;
const D5 = 587.33;
const Ds5 = 622.25;
const Eb5 = 622.25;
const E5 = 659.26;
const F5 = 698.46;
const Fs5 = 739.99;
const Gb5 = 739.99;
const G5 = 783.99;
const Gs5 = 830.61;
const Ab5 = 830.61;
const A5 = 880.00;
const As5 = 932.33;
const Bb5 = 932.33;
const B5 = 987.77;
const C6 = 1046.50;
const Cs6 = 1108.73;
const Db6 = 1108.73;
const D6 = 1174.66;
const Ds6 = 1244.51;
const Eb6 = 1244.51;
const E6 = 1318.51;
const F6 = 1396.91;
const Fs6 = 1479.98;
const Gb6 = 1479.98;
const G6 = 1567.98;
const Gs6 = 1661.22;
const Ab6 = 1661.22;
const A6 = 1760.00;
const As6 = 1864.66;
const Bb6 = 1864.66;
const B6 = 1975.53;
const C7 = 2093.00;
const Cs7 = 2217.46;
const Db7 = 2217.46;
const D7 = 2349.32;
const Ds7 = 2489.02;
const Eb7 = 2489.02;
const E7 = 2637.02;
const F7 = 2793.83;
const Fs7 = 2959.96;
const Gb7 = 2959.96;
const G7 = 3135.96;
const Gs7 = 3322.44;
const Ab7 = 3322.44;
const A7 = 3520.00;
const As7 = 3729.31;
const Bb7 = 3729.31;
const B7 = 3951.07;
const C8 = 4186.01;

export const playCanonD = async () => await playSong([

  // line 1
  [[E4, C4], 1],
  [[D4, G3], 1],

  [[C4, A3], 1],
  [[B3, E3], 1],

  [[A3, F3], 1],
  [[G3, C3], 1],

  [[A3, F3], 1],
  [[B3, G3], 1],

  // line 2
  [[E6, G5, C5], 1],
  [[D6, B5, G4], 1],

  [[C6, A4], 1],
  [[B5, G5, E4], 1],

  [[A5, C5, F4], 1],
  [[G5, E5, C4], 1],

  [[A5, F5, F4], 1],
  [[B5, D5, G4], 1],

  // line 3
  [[C5, C4, E4], [0.5, 1, 1]],
  [C5, 0.5],
  [[D5, D4, G3], [0.5, 1, 1]],
  [B4, 0.5],

  [[C5, E4, A4], [0.5, 1, 1]],
  [E5, 0.5],
  [[G5, E3], [0.5, 1, 1]],
  [G4, 0.5],

  [[A4, A3, F3], [0.5, 1, 1]],
  [F4, 0.5],
  [[E4, C3], [0.5, 1, 1]],
  [G4, 0.5],

  [[F4, A3, F3], [0.5, 1, 1]],
  [C5, 0.5],
  [[B4, B3, G3], [0.5, 1, 1]],
  [G4, 0.5],

  // line 4
  [[C4, E3, C3], [0.5, 1, 1]],
  [E4, 0.25],
  [G4, 0.25],
  [[G4, G2], [0.25, 1, 1]],
  [A4, 0.25],
  [G4, 0.25],
  [F4, 0.25],

  [[E4, A2, C3], [0.75, 1, 1]],
  [E4, 0.25],
  [[E4, G2, E2], [0.25, 1, 1]],
  [F4, 0.25],
  [E4, 0.25],
  [D4, 0.25],

  [[C4, A2, F2], [0.25, 1, 1]],
  [Bb3, 0.25],
  [A3, 0.25],
  [B3, 0.25],
  [[G3, E2, C2], [0.5, 1, 1]],
  [E3, 0.5],

  [[C3, A2, F2], [0.5, 1, 1]],
  [F3, 0.25],
  [E3, 0.25],
  [[D3, B2, G2], [0.5, 1, 1]],
  [G3, 0.25],
  [F3, 0.25],


  // line 5
  [[``, E4, C4], [0.5, 1, 1]],
  [C5, 0.5],
  [[D5, G3], [0.5, 1, 1]],
  [B4, 0.5],

  [[C5, C4, A3], [0.5, 1, 1]],
  [E4, 0.5],
  [[G4, B3, E3], [0.75, 1, 1]],
  [A4, 0.25],

  [[F4, A3, F3], [0.5, 1, 1]],
  [C4, 0.5],
  [[E4, G3, C3], [0.5, 1, 1]],
  [G4, 0.5],

  [[F4, A3, F3], [0.5, 1, 1]],
  [E4, 0.5],
  [[D4, B3, G3], [0.5, 1, 1]],
  [G4, 0.5],

  [[E4, C4, C3], [2, 2, 2]],

]);

export const stopCanonD = () => {
  stopPlayingAudio = true;
};
