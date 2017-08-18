// Display modal text.

import { renderUI } from './lib/cEl/index.js';
import { createRectangle } from './lib/geometry/index.js';
import * as dom from './dom.js';
import { inputs } from './graphics/controls.js';

// Dialog box traits.
// Renders over bottom half of screen.
const stroke = 2;
const width = dom.w - stroke;
const height = dom.h/2;
const x = width/2 + stroke/2;
const y = dom.h - height/2 - stroke*2;
const strokeColor = `#fff`;
const bgColor = `#00f`;

// Text traits.
const textSize = 12;
const lineHeight = textSize*1.2;
const textWidth = width - stroke*4;
const textHeight = height - stroke*4;
const textX = 0 + stroke*2.5;
const textY = y - height/2 + stroke;
const textColor = `#fff`;

const Dialog = (script)=> {
  // Render text that wraps, as well as advances upon input.
  const wrapText = function* (ctx) {
    for(let text of script) {
      ctx.textBaseline = `top`;
      ctx.font = `${textSize}px monospace`;
      ctx.fillStyle = textColor;

      // Stylize text as all-uppercase.
      text = text.toUpperCase();

      const words = text.split(` `);
      let line = ``;
      let lineY = textY;

      // Add words to line one-by-one, test width.
      // Print when wide enough.
      for(const [index, word] of words.entries()) {
        const currLine = `${line + word} `;
        const metrics = ctx.measureText(currLine);
        const currWidth = metrics.width;

        if(currWidth > textWidth && index > 0) {
          ctx.fillText(line, textX, lineY);
          line = `${word} `;
          lineY += lineHeight;
        }
        else {
          line = currLine;
        }
      }
      ctx.fillText(line, textX, lineY);

      // Gotta yield something...
      yield text;

      // Blank out text.
      ctx.fillStyle = bgColor;
      // Fill needs to be a bit bigger than text area due to antialias artifacts.
      ctx.fillRect(textX-1, textY-1, textWidth+2, textHeight+2);
    }
  };

  const muhText = wrapText(dom.ctx);

  // Hook into cEl.
  const { palette, render } = renderUI(dom.c, {
    // Whole screen.
    geometry: createRectangle([0, 0], 0, dom.w, dom.h),

    render: (palette)=> {
      const { ctx, fillRectangle, strokeRectangle, fillText } = palette;

      // Render dialog box.
      ctx.lineWidth = stroke;
      fillRectangle(bgColor, [x,y], width, height);
      strokeRectangle(strokeColor, [x,y], width, height);

      // Render text.
      muhText.next();

      // Advance text upon click.
      const advance = ()=>
        muhText.next().done
        && palette.clear()
        && document.body.removeEventListener(advance);

      document.body.addEventListener(`mousedown`, advance);
    }
  });

  render();
};

export default Dialog;
