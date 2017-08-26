// Display modal text.

import { renderUI } from 'lib/cEl';
import { createRectangle } from 'lib/geometry';
import { inputs } from 'controls';
import { canvas, ctx, viewHeight, viewWidth } from 'dom';

// Menu box traits.
// Flexible size.
const stroke = 2;
let menuWidth = viewWidth/3;
let menuHeight = 0;
let menuX = -viewWidth/2 + menuWidth/2 + stroke/2;
let menuY = viewHeight/2 - menuHeight/2 - stroke/2 | 0;
const strokeColor = `#fff`;
const bgColor = `#00f`;

// Text traits.
const textSize = 12;
const lineHeight = textSize * 1.2;
const textWidth = menuWidth - stroke * 4;
const textHeight = menuHeight - stroke * 4;
const textColor = `#fff`;

const Command = (label, handler, index)=> {
  label = label.toUpperCase();
  const txtMetrics = ctx.measureText(label);
  menuWidth = Math.max(menuWidth, txtMetrics.width + stroke*4);
  menuX = -viewWidth/2 + menuWidth/2 + stroke/2;

  return {
    geometry: createRectangle([
      -menuWidth/2 + stroke*2,
      lineHeight/4 + menuHeight/2 - lineHeight/2 - index*lineHeight | 0
    ], 0, menuWidth, lineHeight),

    render: ({ fillText }, { geometry })=> {
      geometry.position = [
        -menuWidth/2 + stroke*2,
        lineHeight/4 + menuHeight/2 - lineHeight/2 - index*lineHeight | 0
      ];

      fillText({ style: textColor }, [0, 0], label);
    },

    interact: {
      onMouseDown: handler
    }
  };
};

export default class Menu {
  constructor() {
    this.commands = new Set();
  }

  add(label, handler) {
    const cmd = Command(label, handler, this.commands.size);
    this.commands.add(cmd);
    menuHeight = lineHeight*this.commands.size + stroke | 0;
    menuY = viewHeight/2 - menuHeight/2 - stroke/2 | 0;
    return cmd;
  }

  delete(cmd) {
    this.commands.delete(cmd);
    menuHeight = lineHeight*this.commands.size + stroke | 0;
    menuY = viewHeight/2 - menuHeight/2 - stroke/2 | 0;
  }

  render() {
    return {
      geometry: createRectangle([menuX, menuY], 0, menuWidth, menuHeight),

      children: this.commands,

      render: (palette, { geometry }) => {
        geometry.position = [menuX, menuY];

        const { fillRectangle, strokeRectangle } = palette;
        fillRectangle(bgColor, [0,0], menuWidth, menuHeight);
        strokeRectangle(strokeColor, stroke, [0,0], menuWidth, menuHeight);
      }
    };
  }
}
