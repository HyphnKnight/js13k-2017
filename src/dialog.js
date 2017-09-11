// Display modal text.

import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText } from 'pura/canvas/tuple';
import { drawBox, stroke, textSize, lineHeight, whiteFont } from 'style';
import { inputs } from 'controls';
import { viewHeight, viewWidth } from 'dom';
import state from 'state';

let textStart = null;
let maxChar = 0;
const textSpeed = 50;

// Dialog box traits.
// Renders over bottom half of screen.
const dialogWidth = viewWidth - stroke;
const dialogHeight = lineHeight * 5;

// Text traits.
const textWidth = dialogWidth - stroke * 4;
const textHeight = dialogHeight - stroke * 4;

// Formatted text is an array of lineData
// lineData is an array of the following values
// [x,y,text]
const formatText = (ctx, text, maxChar) => {
  const formattedText = [];
  text = text.toUpperCase();

  ctx.textBaseline = `top`;
  ctx.font = `${textSize}px monospace`;

  const words = text.split(` `);
  let line = ``;
  let lineY = 0;
  let charCount = 0;
  // Add words to line one-by-one, test width.
  // Store when wide enough.
  for(const [index, word] of words.entries()) {
    const currLine = `${line + word} `;
    const metrics = ctx.measureText(currLine);
    const currWidth = metrics.width;
    if(charCount + currLine.length > maxChar) {
      if(currWidth > textWidth) {
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);
        charCount += line.length;
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY + lineHeight, word.substr(0, maxChar - charCount)]);
      } else {
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, currLine.substr(0, maxChar - charCount)]);
      }
      return formattedText;
    } else if(currWidth > textWidth && index > 0) {
      formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);
      charCount += line.length;
      line = `${word} `;
      lineY += lineHeight;
    } else {
      line = currLine;
    }
  }

  formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);

  return formattedText;
};

const nextScriptEntry = () => {
  if(maxChar < state.dialog.script[0][0].length) {
    textStart = 1;
    return;
  }

  state.dialog.script.shift();
  textStart = null;

  if(!state.dialog.script.length && state.dialog.callback) {
    state.dialog.callback();
    state.dialog.callback = null;
  }
};

const Dialog = {
  geometry: createRectangle([0, viewHeight / 2 - dialogHeight / 2], 0, dialogWidth, dialogHeight),

  render: ({ geometry }) => {
    const { script } = state.dialog;
    const [currentScript] = script;
    if(!currentScript) return;
    if(!textStart) textStart = Date.now();

    maxChar = ((Date.now() - textStart) / textSpeed) | 0;
    drawBox([0, 0], geometry.width, 0, geometry.height);

    // Render text
    const [text, author] = currentScript;
    const formattedText = formatText(ctx, text, maxChar);
    let offset = 0;
    if(author) {
      const [emoji, name] = author;
      const { width: nameWidth } = ctx.measureText(name);
      const boxWidth = nameWidth + 16 + stroke * 4;
      const leftOffset = -dialogWidth / 2 + nameWidth;
      const topOffset = -dialogHeight / 2 - stroke * 2;
      drawBox([leftOffset, topOffset], boxWidth, 1, stroke * 4);
      ctx.font = `${textSize}px monospace`;
      fillText(whiteFont, [leftOffset - 6 + stroke * 4 - boxWidth / 2, topOffset - lineHeight / 2 - stroke], emoji);
      fillText(whiteFont, [leftOffset - 6 + stroke * 4 - boxWidth / 2 + 16, topOffset - lineHeight / 2 - stroke], name);
      offset = lineHeight * 0.33;
    }
    formattedText.forEach(([x, y, line]) => {
      fillText(whiteFont, [x, y + offset], line);
    });

    if(inputs.space === 1) {
      nextScriptEntry();
    }
  },
  interact: {
    onMouseDown: () => {
      if(state.dialog.script.length) {
        nextScriptEntry();
      }
    },
  }
};

export default Dialog;
