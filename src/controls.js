const keyCodes = {

  '38': `up`,
  '40': `down`,
  '37': `left`,
  '39': `right`,

  '81': `q`,
  '87': `w`,
  '69': `e`,
  '65': `a`,
  '83': `s`,
  '68': `d`,

  '48': `0`,
  '49': `1`,
  '50': `2`,
  '51': `3`,
  '52': `4`,
  '53': `5`,
  '54': `6`,
  '55': `7`,
  '56': `8`,
  '57': `9`,

  '189': `-`,
  '187': `=`,

  '32': `space`,
  '13': `return`,
  '16': `shift`,
  '17': `ctrl`,
  '9': `tab`,
  '18': `alt`

};

export const inputs = {

  up: false,
  down: false,
  left: false,
  right: false,

  q: false,
  w: false,
  e: false,
  a: false,
  s: false,
  d: false,

  '0': false,
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
  '9': false,

  '-': false,
  '=': false,

  space: false,
  return: false,
  shift: false,
  ctrl: false,
  tab: false,
  alt: false,

  click: false

};

const parseKeyInfo =
  (keyCode, active = true) => {
    const key = keyCodes[keyCode];
    if(key) inputs[key] = active;
    return inputs[key];
  };

document.body.onkeyup = ({ keyCode }) => parseKeyInfo(keyCode, false);
document.body.onkeydown = ({ keyCode }) => parseKeyInfo(keyCode, true);
