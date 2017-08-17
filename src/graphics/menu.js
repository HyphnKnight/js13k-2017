import { createRectangle, getRectanglePoints } from '../lib/geometry/index';
import { title_text, base_text, white, black } from './style';
import { inputs } from './controls';

let selected_index = 0;

const createOption = (index, text, pos) => ({
  geometry: createRectangle(pos, 0, 140, 14),
  render: (palette, el) => {
    const { fillRectangle, strokeRectangle, fillText, ctx } = palette;
    ctx.font = base_text;
    const { width } = ctx.measureText(text);
    el.geometry.width = width + 10;
    el.geometry.points = getRectanglePoints(el.geometry.width, el.geometry.height);
    fillText({
      textBaseline: `middle`,
      font: base_text,
      style: white,
    }, [-width / 2, 0], text);
  },
  interact: {
    onMouseMove: () => selected_index = index,
    onMouseDown: () => selected_index = index,
  }
});

export const Menu = {
  geometry: createRectangle([160 / 2, 120], 0, 140, 40),
  children: [
    createOption(0, `new game`, [0, 48]),
    createOption(1, `continue game`, [0, 72]),
  ],
  render: (palette, el) => {
    const { fillText, fillPolygon } = palette;
    fillText({
      textBaseline: `middle`,
      style: white,
      font: title_text,
    }, [-65, -8], `A L T E R`);
    (Date.now() % 600 > 400) && fillPolygon(
      `white`,
      selected_index === 0
        ? [-42, 48]
        : [-60, 72],
      [-5, 3, 5, 0, -5, -3]
    );
    (inputs.up || inputs.w) && (selected_index = 0);
    (inputs.down || inputs.s) && (selected_index = 1);
  },
};
