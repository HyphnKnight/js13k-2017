// Display modal text.

import { renderUI } from 'lib/cEl';
import { createRectangle } from 'lib/geometry';
import { inputs } from 'controls';
import { canvas, ctx, viewHeight, viewWidth } from 'dom';

// Menu box traits.
// Flexible size.
const stroke = 2;
let menuWidth = 0;
let menuHeight = 0;
const strokeColor = `#fff`;
const bgColor = `#00f`;

// Text traits.
const textSize = 12;
const lineHeight = textSize * 1.2;
const textWidth = menuWidth - stroke * 4;
const textHeight = menuHeight - stroke * 4;
const textColor = `#fff`;

const Command = (label, handler)=> {
  menuWidth = Math.max(menuWidth, ctx.measureText(label).width);

  return {
    geometry: createRectangle([viewWidth / 2, viewHeight - menuHeight / 2], 0, menuWidth, menuHeight),

    render: ({ fillText }, { geometry })=> {
      fillText({ style: textColor }, [0, 0], label);
    },

    interact: {
      onMouseDown: handler
    }
  };
};

export class Menu {
  constructor() {
    this.commands = new Set();
  }

  add(label, handler) {
    menuHeight += lineHeight;
    const cmd = Command(label, handler);
    this.commands.add(cmd);
    return cmd;
  }

  delete(cmd) {
    menuHeight -= lineHeight;
    this.commands.delete(cmd);
  }

  render() {
    return {
      geometry: createRectangle([viewWidth / 2, viewHeight - menuHeight / 2], 0, menuWidth, menuHeight),

      children: this.commands,

      render: (palette, { geometry }) => {
        const { ctx, fillRectangle, strokeRectangle, fillText } = palette;
        fillRectangle(bgColor, [0, -stroke/2], geometry.width, geometry.height);
        strokeRectangle(strokeColor, stroke, [0, -stroke/2], geometry.width, geometry.height);


      },
      interact: {
        onMouseDown: () => {

        },
      }
    };
  }
}
