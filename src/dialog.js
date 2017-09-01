// Display modal text.

import { renderUI } from 'pura/cEl';
import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillRectangle, strokeRectangle, fillText } from 'pura/canvas/tuple';
import { drawBox, stroke, textSize, lineHeight, white } from 'style';
import { inputs } from 'controls';
import { canvas, viewHeight, viewWidth } from 'dom';
import state from 'state';

let justDeleted = false;
let textStart = null;
const textSpeed = 50;


// Dialog box traits.
// Renders over bottom half of screen.
const dialogWidth = viewWidth - stroke;
const dialogHeight = viewHeight / 4;

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

export const Dialog = {
  geometry: createRectangle([0, viewHeight / 2 - dialogHeight / 2], 0, dialogWidth, dialogHeight),
  render: ({ geometry }) => {
    const { dialog } = state;
    const [currentDialog] = dialog;
    if(!currentDialog) return;
    if(!textStart) textStart = Date.now();

    const maxChar = Math.floor((Date.now() - textStart) / textSpeed);
    drawBox([0, 0], geometry.width, 0, geometry.height);

    // Render text
    const [text, author] = currentDialog;
    const formattedText = formatText(ctx, text, maxChar);
    let offset = 0;
    if(author) {//author) {
      const [emoji, name] = author;
      const { width: nameWidth } = ctx.measureText(name);
      const boxWidth = nameWidth + 16 + stroke * 4;
      const leftOffset = -dialogWidth / 2 + nameWidth;
      const topOffset = -dialogHeight / 2 - stroke * 2;
      drawBox([leftOffset, topOffset], boxWidth, 1, stroke * 4);
      ctx.font = `${textSize}px monospace`;
      fillText({ style: white }, [leftOffset - 6 + stroke * 4 - boxWidth / 2, topOffset - lineHeight / 2], emoji);
      fillText({ style: white }, [leftOffset - 6 + stroke * 4 - boxWidth / 2 + 16, topOffset - lineHeight / 2], name);
      offset = lineHeight / 2;
    }
    formattedText.forEach(([x, y, line]) => {
      fillText({ style: white }, [x, y + offset], line);
    });

    if(/*maxChar >= text.length &&*/ inputs.space && !justDeleted) {
      state.dialog.shift();
      textStart = null;
      justDeleted = true;
    } else if(!inputs.space && justDeleted) {
      justDeleted = false;
    }
  },
  interact: {
    onMouseDown: () => {
      //if(maxChar >= text.length) {
      state.dialog.shift();
      textStart = null;
      //}
    },
  }
};
