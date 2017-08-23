// Display modal text.

import { renderUI } from '../lib/cEl/index.js';
import { createRectangle } from '../lib/geometry/index.js';
import { inputs } from './controls.js';
import { canvas, viewHeight, viewWidth } from '../dom.js';
import state from '../state.js';

let justDeleted = false;


// Dialog box traits.
// Renders over bottom half of screen.
const stroke = 2;
const dialogWidth = viewWidth - stroke;
const dialogHeight = viewHeight / 4;
const strokeColor = `#fff`;
const bgColor = `#00f`;

// Text traits.
const textSize = 12;
const lineHeight = textSize * 1.2;
const textWidth = dialogWidth - stroke * 4;
const textHeight = dialogHeight - stroke * 4;
const textColor = `#fff`;


// Formatted text is an array of lineData
// lineData is an array of the following values
// [x,y,text]
const formatText = (ctx, text) => {
  const formattedText = [];
  text = text.toUpperCase();

  ctx.textBaseline = `top`;
  ctx.font = `${textSize}px monospace`;

  const words = text.split(` `);
  let line = ``;
  let lineY = 0;
  // Add words to line one-by-one, test width.
  // Store when wide enough.
  for (const [index, word] of words.entries()) {
    const currLine = `${line + word} `;
    const metrics = ctx.measureText(currLine);
    const currWidth = metrics.width;

    if (currWidth > textWidth && index > 0) {
      formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);
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
  // Whole screen.
  geometry: createRectangle([viewWidth / 2, viewHeight - dialogHeight / 2], 0, dialogWidth, dialogHeight),

  render: (palette, { geometry }) => {
    const { dialog } = state;
    if (!dialog.length) return;

    const { ctx, fillRectangle, strokeRectangle, fillText } = palette;

    fillRectangle(bgColor, [0, 0], geometry.width, geometry.height);
    strokeRectangle(strokeColor, [0, 0], geometry.width, geometry.height);

    // Render text
    const [text, author] = dialog[0];
    const formattedText = formatText(ctx, text);
    let offset = 0;
    if (author) {//author) {
      const [emoji, name] = author;
      const { width: nameWidth } = ctx.measureText(name);
      const boxWidth = nameWidth + 16 + stroke * 4;
      const leftOffset = -dialogWidth / 2 + nameWidth;
      const topOffset = -dialogHeight / 2 - stroke * 2;
      fillRectangle(bgColor, [leftOffset, topOffset], boxWidth, lineHeight + stroke * 4);
      strokeRectangle(strokeColor, [leftOffset, topOffset], boxWidth, lineHeight + stroke * 4);
      ctx.font = `${textSize}px monospace`;
      fillText({ style: textColor }, [leftOffset - 6 + stroke * 4 - boxWidth / 2, topOffset - lineHeight / 2], emoji);
      fillText({ style: textColor }, [leftOffset - 6 + stroke * 4 - boxWidth / 2 + 16, topOffset - lineHeight / 2], name);
      offset = lineHeight / 2;
    }
    formattedText.forEach(([x, y, line]) => {
      fillText({ style: textColor }, [x, y + offset], line);
    });

    if (inputs.space && !justDeleted) {
      state.dialog.shift();
      justDeleted = true;
    } else if (!inputs.space && justDeleted) {
      justDeleted = false;
    }
  },
  interact: {
    onMouseDown: () => state.dialog.shift(),
  }
};
