import { add } from 'pura/vector/tuple';
import { fillRectangle, strokeRectangle } from 'pura/canvas/tuple';

// colors
export const black = `#000`;
export const white = `#fff`;
export const boxBg = `#00f`;

// fonts
const header = `Arial Black, Gadget, sans-serif`;
const mono = `"Lucida Console", Monaco, monospace`;

// font styles
export const textSize = 12;
export const lineHeight = textSize * 1.1;

export const title_text = `24px ${header}`;
export const button_text = `16px ${mono}`;
export const base_text = `${textSize}px ${mono}`;

// stroke styles
export const stroke = 2;
export const strokeOptions = {
  style: white,
  thickness: stroke,
};

// Common Draw Commands
const boxOffset = [0, -stroke / 2];
export const drawBox =
  (position, width, lines, height = 0) => {
    fillRectangle(boxBg, add(position, boxOffset), width, lines * lineHeight + height);
    strokeRectangle(strokeOptions, add(position, boxOffset), width, lines * lineHeight + height);
  };
