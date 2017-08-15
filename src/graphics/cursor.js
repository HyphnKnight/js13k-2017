import { subtract } from '../lib/vector/index';

let cursor_position = [0, 0];

export const Cursor = {
  render: (palette) => {

    const { strokeArc, fillText, ctx, moveTo, lineTo } = palette;
    /* Default cursor */

    strokeArc('white', cursor_position, 0, 4);

    ctx.strokeStyle = 'white';

    ctx.beginPath();
    moveTo(subtract(cursor_position, [0, -10]));
    lineTo(subtract(cursor_position, [0, 10]));
    ctx.stroke();
    ctx.beginPath();
    moveTo(subtract(cursor_position, [-10, 0]));
    lineTo(subtract(cursor_position, [10, 0]));
    ctx.stroke();

  },
  interact: {
    onMouseMove: (_, position) => cursor_position = [position.x, position.y],
  }
};
