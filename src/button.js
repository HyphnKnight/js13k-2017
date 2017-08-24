import { createRectangle } from './lib/geometry/index';
import { button_text, white } from './style';

export const createButton = (text, pos, onClick) => ({
  geometry: createRectangle(pos, 0, 140, 14),
  render: (palette, el) => {
    const { fillRectangle, strokeRectangle, fillText, ctx } = palette;

    ctx.font = button_text;
    const { width } = ctx.measureText(text);
    el.geometry.width = width + 10;

    const fontStyle = {
      textBaseline: `middle`,
      font: button_text,
      style: white,
    };

    strokeRectangle(white, 1, [0, 0], el.geometry.width, el.geometry.height, 0);
    fillText(fontStyle, [-width/2, 0], text);
  },
  interact: {
    onMouseDown: (_, position) => onClick(position),
  }
});
