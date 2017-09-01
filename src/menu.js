// Display modal text.

import { renderUI } from 'pura/cEl';
import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText, fillRectangle, strokeRectangle } from 'pura/canvas/tuple';
import { inputs } from 'controls';
import { canvas, viewHeight, viewWidth } from 'dom';
import { pointRight } from 'emoji';

// Menu box traits.
// Flexible size.
const stroke = 2;
let menuWidth = viewWidth / 3;
let menuHeight = 0;
let menuX = viewWidth / 2 - menuWidth / 2 - stroke / 2;
let menuY = viewHeight / 2 - menuHeight / 2 - stroke / 2 | 0;
const bgColor = `#00f`;
const strokeOptions = {
  style: `#fff`,
  thickness: stroke,
};

// Text traits.
const textSize = 12;
const lineHeight = textSize * 1.2;
const textWidth = menuWidth - stroke * 4;
const textHeight = menuHeight - stroke * 4;
const textColor = `#fff`;

const Command = (label, handler, index) => {
  label = label.toUpperCase();
  const txtMetrics = ctx.measureText(label);
  menuWidth = Math.max(menuWidth, txtMetrics.width + stroke * 4);
  menuX = viewWidth / 2 - menuWidth / 2 - stroke / 2;

  const poz = ()=> [
    -menuWidth/2 + stroke*2,
    lineHeight/4 + menuHeight/2 - lineHeight/2 - index*lineHeight | 0
  ];

  return {
    geometry: createRectangle(poz(), 0, menuWidth, lineHeight),

    render: ({ geometry }) => {
      geometry.position = poz();

      fillText({ style: textColor }, [0, 0], label);
    },

    interact: {
      onMouseDown: handler
    }
  };
};

export default class Menu {
  constructor() {
    this.commands = [];
    this.activeIndex = 0;
  }

  add(label, handler) {
    const cmd = Command(label, handler, this.commands.length);
    this.commands.unshift(cmd);
    menuHeight = lineHeight * this.commands.length + stroke | 0;
    menuY = viewHeight / 2 - menuHeight / 2 - stroke / 2 | 0;
    return cmd;
  }

  delete(cmd) {
    this.commands.splice(this.commands.indexOf(cmd), 1);
    menuHeight = lineHeight * this.commands.length + stroke | 0;
    menuY = viewHeight / 2 - menuHeight / 2 - stroke / 2 | 0;
  }

  render() {
    return {
      geometry: createRectangle([menuX, menuY], 0, menuWidth, menuHeight),

      children: this.commands,

      render: ({ geometry, children }) => {
        if(!this.commands.length) {
          return;
        }

        geometry.position = [menuX, menuY];
        fillRectangle(bgColor, [0, 0], menuWidth, menuHeight);
        strokeRectangle(strokeOptions, [0, 0], menuWidth, menuHeight);

        // Render pointer hand.
        const [x, y] = children[this.activeIndex].geometry.position;
        fillText({}, [x - 13, y], pointRight);
      }
    };
  }
}
