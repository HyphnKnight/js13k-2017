import { subtractSet, scaleToSet } from 'pura/vector/tuple';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from './dom.js';

const keyCodes = {

  '38': `up`,
  '40': `down`,
  '37': `left`,
  '39': `right`,

  '87': `w`,
  '65': `a`,
  '83': `s`,
  '68': `d`,

  '32': `space`,
  '13': `return`,

};

export const inputs = {

  up: 0,
  down: 0,
  left: 0,
  right: 0,

  w: 0,
  a: 0,
  s: 0,
  d: 0,


  space: 0,
  return: 0,

  mousePosition: null,

  click: null,

};

const parseKeyInfo =
  (keyCode, active = 1) => {
    const key = keyCodes[keyCode];
    if(key && (active === 0 || inputs[key] !== 2)) inputs[key] = active;
    return inputs[key];
  };

document.body.onkeyup = ({ keyCode }) => parseKeyInfo(keyCode, 0);
document.body.onkeydown = ({ keyCode }) => parseKeyInfo(keyCode, 1);

export const updateInputs = () => {
  const keys = Object.keys(inputs);
  let i = -1;
  while(++i < keys.length) {
    if(inputs[keys[i]] === 1) inputs[keys[i]] = 2;
    else inputs[keys[i]] = inputs[keys[i]];
  }
};

document.body.onmousedown = () => inputs.click = 1;
document.body.onmouseup = () => inputs.click = 0;

const calcMousePosition =
  ({ clientX, clientY, touches }) =>
    touches
      ? ([touches[0].clientX, touches[0].clientY])
      : ([clientX, clientY]);

document.body.onmousemove = (evt) => {
  const position = subtractSet(calcMousePosition(evt), [canvasOffsetLeft, canvasOffsetTop]);
  position[0] *= scaleX;
  position[1] *= scaleY;
  inputs.mousePosition = position;
};

export const keyboardVector =
  (magnitude) =>
    () => {
      const directional = [0, 0];
      if(inputs.up || inputs.w)++directional[1];
      if(inputs.down || inputs.s)--directional[1];
      if(inputs.left || inputs.a)--directional[0];
      if(inputs.right || inputs.d)++directional[0];
      return scaleToSet(directional, magnitude);
    };
