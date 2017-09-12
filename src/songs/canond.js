import * as note from 'audio/notes';

const ch1 = [[note.A3, note.F3], 1],
      ch2 = [note.C5, 0.5],
      ch3 = [note.B4, 0.5],
      ch4 = [note.G4, 0.5],
      ch5 = [[note.F4, note.A3, note.F3], [0.5, 1, 1]],
      ch6 = [note.E4, 0.25],
      ch7 = [note.G4, 0.25],
      ch8 = [note.A4, 0.25],
      ch9 = [note.F4, 0.25],
      ch10 = [note.F3, 0.25],
      ch11 = [note.E4, 0.5];

const canond = [

  // Staff 1.
  [[note.E4, note.C4], 1],
  [[note.D4, note.G3], 1],

  [[note.C4, note.A3], 1],
  [[note.B3, note.E3], 1],

  ch1,
  [[note.G3, note.C3], 1],

  ch1,
  [[note.B3, note.G3], 1],

  // Staff 2.
  [[note.E6, note.G5, note.C5], 1],
  [[note.D6, note.B5, note.G4], 1],

  [[note.C6, note.A4], 1],
  [[note.B5, note.G5, note.E4], 1],

  [[note.A5, note.C5, note.F4], 1],
  [[note.G5, note.E5, note.C4], 1],

  [[note.A5, note.F5, note.F4], 1],
  [[note.B5, note.D5, note.G4], 1],

  // Staff 3.
  [[note.C5, note.C4, note.E4], [0.5, 1, 1]],
  ch2,
  [[note.D5, note.D4, note.G3], [0.5, 1, 1]],
  ch3,

  [[note.C5, note.E4, note.A4], [0.5, 1, 1]],
  [note.E5, 0.5],
  [[note.G5, note.E3], [0.5, 1, 1]],
  ch4,

  [[note.A4, note.A3, note.F3], [0.5, 1, 1]],
  [note.F4, 0.5],
  [[note.E4, note.C3], [0.5, 1, 1]],
  ch4,

  ch5,
  ch2,
  [[note.B4, note.B3, note.G3], [0.5, 1, 1]],
  ch4,

  // Staff 4.
  [[note.C4, note.E3, note.C3], [0.5, 1, 1]],
  ch6,
  ch7,
  [[note.G4, note.G2], [0.25, 1, 1]],
  ch8,
  ch7,
  ch9,

  [[note.E4, note.A2, note.C3], [0.75, 1, 1]],
  ch6,
  [[note.E4, note.G2, note.E2], [0.25, 1, 1]],
  ch9,
  ch6,
  [note.D4, 0.25],

  [[note.C4, note.A2, note.F2], [0.25, 1, 1]],
  [note.Bb3, 0.25],
  [note.A3, 0.25],
  [note.B3, 0.25],
  [[note.G3, note.E2, note.C2], [0.5, 1, 1]],
  [note.E3, 0.5],

  [[note.C3, note.A2, note.F2], [0.5, 1, 1]],
  ch10,
  [note.E3, 0.25],
  [[note.D3, note.B2, note.G2], [0.5, 1, 1]],
  [note.G3, 0.25],
  ch10,


  // Staff 5.
  [[``, note.E4, note.C4], [0.5, 1, 1]],
  ch2,
  [[note.D5, note.G3], [0.5, 1, 1]],
  ch3,

  [[note.C5, note.C4, note.A3], [0.5, 1, 1]],
  ch11,
  [[note.G4, note.B3, note.E3], [0.75, 1, 1]],
  ch8,

  ch5,
  [note.C4, 0.5],
  [[note.E4, note.G3, note.C3], [0.5, 1, 1]],
  ch4,

  ch5,
  ch11,
  [[note.D4, note.B3, note.G3], [0.5, 1, 1]],
  ch4,

  [[note.E4, note.C4, note.C3], [2, 2, 2]],

];

export default canond;
