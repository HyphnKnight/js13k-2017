// Display modal text.

import { renderUI } from 'lib/cEl';
import { createRectangle } from 'lib/geometry';
import { inputs } from 'controls';
import { canvas, viewHeight, viewWidth } from 'dom';

// Menu box traits.
// Renders over bottom half of screen.
const stroke = 2;
const menuWidth = viewWidth - stroke;
const menuHeight = viewHeight / 4;
const strokeColor = `#fff`;
const bgColor = `#00f`;

// Text traits.
const textSize = 12;
const lineHeight = textSize * 1.2;
const textWidth = menuWidth - stroke * 4;
const textHeight = menuHeight - stroke * 4;
const textColor = `#fff`;

const Command = (label, handler)=> ({
  geometry: createRectangle([viewWidth / 2, viewHeight - menuHeight / 2], 0, menuWidth, menuHeight),

  render: ({ fillText }, { geometry })=> {
    fillText({ style: textColor }, [0, 0], label);
  },

  interact: {
    onMouseDown: handler
  }
});

export class Menu {
  constructor() {
    this.commands = new Set();
  }

  add(label, handler) {
    const cmd = Command(label, handler);
    this.commands.add(cmd);
    return cmd;
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
