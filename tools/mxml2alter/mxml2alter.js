// Usage:
// mxml2alter.js xml_filename [song_filename || `song.js`] [number_of_measures || all measures]

const fs = require(`fs`),
      path = require(`path`),
      { promisify } = require(`util`);

const xml2js = require(`xml2js`);

const argMxml = process.argv[2],
      argName = process.argv[3] || `song.js`,
      argMesr = process.argv[4] || Infinity;

const parser = new xml2js.Parser();
const readFileAsync = promisify(fs.readFile),
      parseAsync = promisify(parser.parseString);

const parse = async ()=> {
  const data = await readFileAsync(path.join(__dirname, argMxml));
  return await parseAsync(data);
};

const alter = [`import * as note from 'audio/notes';

const song = [`];

const noteTypes = {
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  '16th': 0.25,
  '32nd': 0.125
};

const convert = async ()=> {
  const music = await parse();

  const measures = music[`score-partwise`].part[0].measure,
        mesrLen = measures.length;

  const notes = [];

  for(let i = 0; i < argMesr && i < mesrLen; ++i) {
    const posCol = new Set();

    for(const note of measures[i].note) {
      if(note.$ && posCol.has(note.$[`default-x`])) {
        continue;
      }

      const currNotes = [];

      if(note.$ && note.$[`default-x`]) {
        const x = note.$[`default-x`];

        posCol.add(x);

        currNotes.push(...measures[i].note.filter((note)=> {
          return note.$ && note.$[`default-x`] === x;
        }));
      } else {
        currNotes.push(note);
      }

      notes.push(...currNotes);
    }
  }
  notes.push(false);

  let notePos = -1,
      noteCol = [notes[0]];

  for(const note of notes) {
    try {
      if(noteCol[0] === false) {
        break;
      }

      if(note.$) {
        if(note.$[`default-x`] === notePos) {
          noteCol.push(note);
          continue;
        } else {
          notePos = note.$[`default-x`];
        }
      }

      alter.push(`\n  [`);

      if(noteCol.length > 1) {
        alter.push(`[`);
      }

      for(const subNote of noteCol) {
        if(subNote.rest){
          alter.push(`\`\``);
        } else {
          alter.push(`note.${
            subNote.pitch[0].step[0]
          }${
            subNote.pitch[0].octave[0]
          }`);

          if(noteCol.length > 1) {
            alter.push(`, `);
          }
        }
      }

      if(noteCol.length > 1) {
        alter.push(`]`);
      }

      alter.push(`, ${
        noteCol[0].type
          ? noteTypes[noteCol[0].type[0]]
          : 2
      }],`);

      noteCol = [note];
    } catch(e) {
      console.error(note);
      console.error(e);
    }
  }

  write(argMesr !== Infinity ? argMesr : mesrLen);
};

const write = (numMeasures)=> {
  alter.push(`
];

export default song;`);

  fs.writeFileSync(
    path.join(
      path.join(`${__dirname.split(`tools`)[0]}`, `src`, `songs`),
      argName
    ),
    alter.join(``),
    `utf8`
  );

  console.info(`${numMeasures} measures transcribed!`);
};

convert();
