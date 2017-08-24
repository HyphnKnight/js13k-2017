(function () {
'use strict';

const sum$1 = (...numbers) => {
  let num = 0;
  for(let i = numbers.length - 1; i >= 0; --i) {
    num += numbers[i];
  }
  return num;
};
const noise = (list, getNeighbors, getValue, setValue, iterations = 1) => {
  for(let i = list.length - 1; i >= 0; --i) {
    const neighbors = getNeighbors(list[i]);
    const neighborValue = sum$1(...neighbors.map(getValue)) / neighbors.length;
    const newValue = neighborValue + getValue(list[i]) / 2;
    setValue(list[i], newValue);
  }
  if(iterations)
    noise(list, getNeighbors, getValue, setValue, iterations - 1);
  return list;
};
function getGridNeighbors(grid, x, y, radius = 1) {
  const results = [];
  for(let yOffset = radius * -1; yOffset < radius + 1; ++yOffset) {
    for(let xOffset = radius * -1; xOffset < radius + 1; ++xOffset) {
      const newY = y + yOffset;
      const newX = x + xOffset;
      if(!!grid[newY] && !!grid[newY][newX] && (!!yOffset || !!xOffset)) {
        results.push(grid[newY][newX]);
      }
    }
  }
  return results;
}

const sign = (num) => num > 0
  ? 1
  : (num < 0
    ? -1
    : 0);



const sqr = (x) => x * x;
function round(num, places = 8) {
  const base = Math.pow(10, places);
  return Math.round(num * base) / base;
}

const addSet = (base, mod) => {
  base[0] += mod[0];
  base[1] += mod[1];
  return base;
};
const subtract = (vecA, vecB) => ([
  vecA[0] - vecB[0],
  vecA[1] - vecB[1]
]);
const subtractSet = (base, mod) => {
  base[0] -= mod[0];
  base[1] -= mod[1];
  return base;
};

const scaleSet = (base, scale) => {
  base[0] *= scale;
  base[1] *= scale;
  return base;
};



const magnitudeSqr = (vec) => sqr(vec[0]) + sqr(vec[1]);
const magnitude = (vec) => Math.sqrt(magnitudeSqr(vec));

const normalizeSet = (vec) => vec[0] === 0 && vec[1] === 0
  ? [0, 0]
  : scaleSet(vec, 1 / magnitude(vec));






function rotate(vec, rotation) {
  const s = Math.sin(rotation);
  const c = Math.cos(rotation);
  return [
    round(vec[0] * c - vec[1] * s),
    round(vec[0] * s + vec[1] * c)
  ];
}


const scaleToSet = (vec, newMagnitude) => scaleSet(normalizeSet(vec), newMagnitude);













const mapList = (list, mod) => {
  const result = [];
  for(let i = 0, len = list.length; i < len; i += 2) {
    const [x, y] = mod([list[i], list[i + 1]]);
    result[i] = x;
    result[i + 1] = y;
  }
  return result;
};
const addList = (list, mod) => {
  const result = [];
  for(let i = 0, len = list.length; i < len; i += 2) {
    result[i] = list[i] + mod[0];
    result[i + 1] = list[i + 1] + mod[1];
  }
  return result;
};
const addListSet = (list, mod) => {
  for(let i = 0, len = list.length; i < len; i += 2) {
    list[i] += mod[0];
    list[i + 1] += mod[1];
  }
  return list;
};
const subtractList = (list, mod) => {
  const result = [];
  for(let i = 0, len = list.length; i < len; i += 2) {
    result[i] = list[i] - mod[0];
    result[i + 1] = list[i + 1] - mod[1];
  }
  return result;
};







const rotateList = (list, rotation) => {
  const result = [];
  const s = Math.sin(rotation);
  const c = Math.cos(rotation);
  for(let i = 0, len = list.length; i < len; i += 2) {
    result[i] = round(list[i] * c - list[i + 1] * s);
    result[i + 1] = round(list[i] * s + list[i + 1] * c);
  }
  return result;
};

const rotateListAround = (list, point, rotation) => addList(rotateList(subtractList(list, point), rotation), point);

const uniqueId = () => Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);

function find(array, func) {
  let i = -1;
  while(++i < array.length) {
    if(func(array[i], i, array))
      return array[i];
  }
  
  return null;
}

/* Utilities */
const getRectanglePoints = (width, height) => ([
  -width / 2, +height / 2,
  -width / 2, -height / 2,
  +width / 2, -height / 2,
  +width / 2, +height / 2,
]);


/* Basic Geometry */


const createRectangle = (position, rotation = 0, width = 1, height = 1, label = ``) => ({
  id: uniqueId(),
  shape: `Rectangle`,
  label,
  position, rotation,
  width, height,
  points: getRectanglePoints(width, height),
});

/* Custom Geometry */


/* Utility Funcs */

// Reused DOM elements and objects.

const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext(`2d`);
const viewWidth = 320;
const viewHeight = 240;
let canvasOffsetLeft = canvas.offsetWidth;
let canvasOffsetTop = canvas.offsetHeight;
let scaleX = 1;
let scaleY = 1;

canvas.width = viewWidth;
canvas.height = viewHeight;

const calcCanvasSize = () => {
  const { top, left, width, height } = canvas.getBoundingClientRect();
  canvasOffsetLeft = left;
  canvasOffsetTop = top;
  scaleX = viewWidth / width;
  scaleY = viewHeight / height;
};

calcCanvasSize();

window.addEventListener(`resize`, calcCanvasSize);

const originVector = [0, 0];
const translate = (ctx) => (vec) => ctx.translate(round(vec[0], 0), round(vec[1], 0));
const rotate$1 = (ctx) => (angle) => ctx.rotate(angle);
const clearRect = (ctx) => (vec, width, height) => ctx.clearRect(round(vec[0], 0), round(vec[1], 0), round(width, 0), round(height, 0));
const clear = (ctx, canvas) => () => clearRect(ctx)(originVector, canvas.width, canvas.height);
const moveTo = (ctx) => (vec) => ctx.moveTo(round(vec[0], 0), round(vec[1], 0));
const lineTo = (ctx) => (vec) => ctx.lineTo(round(vec[0], 0), round(vec[1], 0));
const quadraticCurveTo = (ctx) => (vec, control) => ctx.quadraticCurveTo(round(control[0], 0), round(control[1], 0), round(vec[0], 0), round(vec[1], 0));
const arc = (ctx) => (vec, radius, startAngle, endAngle, counterClockwise) => ctx.arc(round(vec[0], 0), round(vec[1], 0), radius, startAngle, endAngle, counterClockwise);
const rect = (ctx) => (vec, width, height) => ctx.rect(round(vec[0], 0), round(vec[1], 0), round(width, 0), round(height, 0));
const drawImage = (ctx) => (image) => (vec, width, height) => ctx.drawImage(image, round(vec[0], 0), round(vec[1], 0), width, height);
const drawSlicedImage = (ctx) => (image) => (vec, slice, sliceWidth, sliceHeight, width, height) => ctx.drawImage(image, round(slice[0], 0), round(slice[1], 0), sliceWidth, sliceHeight, round(vec[0], 0), round(vec[1], 0), width, height);
const drawLine = (ctx) => (points, angle = 0) => {
  const origin = [points[0], points[1]];
  const adjustedPoints = subtractList(points, origin);
  ctx.save();
  translate(ctx)(origin);
  rotate$1(ctx)(angle);
  moveTo(ctx)([0, 0]);
  for(let i = 0; i < adjustedPoints.length; i += 2) {
    lineTo(ctx)([adjustedPoints[i], adjustedPoints[i + 1]]);
  }
  ctx.restore();
};
const drawPolygon = (ctx) => (position, points, angle = 0) => {
  ctx.save();
  translate(ctx)(position);
  rotate$1(ctx)(angle);
  moveTo(ctx)([
    points[points.length - 2],
    points[points.length - 1]
  ]);
  for(let i = 0; i < points.length; i += 2) {
    lineTo(ctx)([points[i], points[i + 1]]);
  }
  ctx.restore();
};
const drawRectangle = (ctx) => (position, width, height, angle = 0) => {
  ctx.save();
  translate(ctx)(position);
  rotate$1(ctx)(angle);
  rect(ctx)([-width / 2, -height / 2], round(width, 0), round(height, 0));
  ctx.restore();
};
const drawArc = (ctx) => (vec, angle, radius = 100, startAngle = 0, endAngle = 2 * Math.PI, counterClockwise = false) => {
  ctx.save();
  translate(ctx)(vec);
  rotate$1(ctx)(angle);
  arc(ctx)([0, 0], radius, startAngle, endAngle, counterClockwise);
  ctx.restore();
};
const fill = (draw) => (ctx) => (style, ...args) => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = style;
  draw(ctx)(...args);
  ctx.fill();
  ctx.restore();
};
const stroke = (draw) => (ctx) => (style, ...args) => {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = style;
  draw(ctx)(...args);
  ctx.stroke();
  ctx.restore();
};
const fillPolygon$1 = fill(drawPolygon);
const fillRectangle = fill(drawRectangle);
const fillLine = fill(drawLine);
const fillArc$1 = fill(drawArc);
const strokePolygon$1 = stroke(drawPolygon);
const strokeRectangle = stroke(drawRectangle);
const strokeLine = stroke(drawLine);
const strokeArc = stroke(drawArc);
const strokeText = (ctx) => (fontOptions, vec, text) => {
  ctx.save();
  ctx.strokeStyle = fontOptions.style || ``;
  ctx.font = fontOptions.font || ctx.font;
  ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
  ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
  ctx.strokeText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
  ctx.restore();
};
const fillText$1 = (ctx) => (fontOptions, vec, text) => {
  ctx.save();
  ctx.fillStyle = fontOptions.style || ``;
  ctx.font = fontOptions.font || ctx.font;
  ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
  ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
  ctx.fillText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
  ctx.restore();
};
const createPalette = (ctx) => ({
  ctx,
  canvas: ctx.canvas,
  translate: translate(ctx),
  rotate: rotate$1(ctx),
  moveTo: moveTo(ctx),
  lineTo: lineTo(ctx),
  quadraticCurveTo: quadraticCurveTo(ctx),
  arc: arc(ctx),
  drawLine: drawLine(ctx),
  drawPolygon: drawPolygon(ctx),
  drawArc: drawArc(ctx),
  drawImage: drawImage(ctx),
  drawSlicedImage: drawSlicedImage(ctx),
  fillRectangle: fillRectangle(ctx),
  fillPolygon: fillPolygon$1(ctx),
  fillLine: fillLine(ctx),
  fillArc: fillArc$1(ctx),
  fillText: fillText$1(ctx),
  strokePolygon: strokePolygon$1(ctx),
  strokeRectangle: strokeRectangle(ctx),
  strokeLine: strokeLine(ctx),
  strokeArc: strokeArc(ctx),
  strokeText: strokeText(ctx),
  clearRect: clearRect(ctx),
  clear: clear(ctx, ctx.canvas)
});

class Transform {
  constructor() {
    this.position = originVector;
    this.rotation = 0;
    this.saved_positions = [];
    this.saved_rotations = [];
  }
  apply(geometry) {
    const position = [this.position[0], this.position[1]];
    const rotation = this.rotation;
    return Object.assign(Object.create(null), geometry, { id: uniqueId(), position, rotation });
  }
  save() {
    this.saved_positions.push([this.position[0], this.position[1]]);
    this.saved_rotations.push(this.rotation);
  }
  restore() {
    if(this.saved_positions.length > 0) {
      const pos = this.saved_positions.pop();
      if(pos) {
        this.position[0] = pos[0];
        this.position[1] = pos[1];
      }
      const rot = this.saved_rotations.pop();
      if(!!rot || rot === 0) {
        this.rotation = rot;
      }
    }
  }
}

/* -1 === left, 0 === aligned, 1 === right */
const pointRelationToLine = (point, line) => sign((line[2] - line[0]) * (point[1] - line[1]) - (line[3] - line[1]) * (point[0] - line[0]));
const isPointInCircle = (point, position, radius) => magnitudeSqr(subtract(point, position)) <= sqr(radius);
const isPointInAlignedRectangle = (point, position, width, height) => Math.abs(point[0] - position[0]) <= width / 2 &&
    Math.abs(point[1] - position[1]) <= height / 2;
const isPointInPolygon = (point, points) => {
  const length = Math.floor(points.length / 2);
  for(let i = 0; i < length; i += 2) {
    const next = i === length - 1 ? 0 : i + 1; //points[i], points[]
    if(pointRelationToLine(point, [points[i], points[i + 1], points[next], points[next + 1]]) === -1)
      return true;
  }
  return false;
};

const isCircleInAlignedRectangle = (positionA, radius, positionB, width, height) => isPointInAlignedRectangle(positionA, positionB, width, height) ||
    isPointInCircle(positionB, positionA, radius) ||
    (sqr(positionA[0] - Math.max(positionB[0], Math.min(positionA[0], positionB[0] + width))) +
        sqr(positionA[1] - Math.max(positionB[1], Math.min(positionA[1], positionB[1] + height)))) < sqr(radius);
const isAlignedRectangleInAlignedRectangle = (positionA, widthA, heightA, positionB, widthB, heightB) => !(Math.abs(positionB[0] - positionA[0]) > widthA / 2 + widthB / 2 ||
    Math.abs(positionB[1] - positionA[1]) > heightA / 2 + heightB / 2);
const isPolygonInPolygon = (positionA, pointsA, positionB, pointsB) => {
  if(isPointInPolygon(positionA, pointsB) ||
        isPointInPolygon(positionB, pointsA))
    return true;
  const length = Math.max(pointsA.length, pointsB.length);
  for(let i = 0; i < length; i += 2) {
    if((i < pointsA.length && isPointInPolygon([pointsA[i], pointsA[i + 1]], pointsB)) ||
            (i < pointsB.length && isPointInPolygon([pointsB[i], pointsB[i + 1]], pointsA)))
      return true;
  }
  return false;
};

/*
    Nestable UI elements that instead of being dom nodes are instead
    are rendered to a canvas element.
 */
const onMouseDownCollection = new Map();
const onMouseMoveCollection = new Map();
const onMouseUpCollection = new Map();
const windowGeometry = createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, `window`);
window.onresize =
  () => Object.assign(windowGeometry, createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, `window`));
const isInViewport = (viewport = windowGeometry) => (cEl) => {
  const { geometry = { shape: null } } = cEl;
  switch(geometry.shape) {
    case `Circle`: return isCircleInAlignedRectangle(geometry.position, geometry.radius, viewport.position, viewport.width, viewport.height);
    case `Rectangle`: return isAlignedRectangleInAlignedRectangle(geometry.position, geometry.width, geometry.height, viewport.position, viewport.width, viewport.height);
    case `Polygon`: return isPolygonInPolygon(geometry.position, addListSet(rotateListAround(geometry.points, [0, 0], geometry.rotation), geometry.position), viewport.position, addListSet(rotateListAround(viewport.points, [0, 0], viewport.rotation), viewport.position));
    default: return true;
  }
};
const isInWindow = isInViewport(windowGeometry);
const renderCEl = (transform, palette) => (el) => {
  const { geometry, children, render, interact } = el;
  const { ctx: ctx$$1, translate, rotate: rotate$$1 } = palette;
  ctx$$1.save();
  transform.save();
  if(geometry) {
    translate(geometry.position);
    addSet(transform.position, rotate(geometry.position, transform.rotation));
    rotate$$1(geometry.rotation);
    transform.rotation += geometry.rotation;
  }
  ctx$$1.save();
  render && (!geometry || isInWindow(transform.apply(geometry))) && render(palette, el);
  ctx$$1.restore();
  children && children.forEach(renderCEl(transform, palette));
  if(interact) {
    if(interact.onMouseDown) {
      onMouseDownCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseDown]);
    }
    else {
      onMouseDownCollection.delete(el);
    }
    if(interact.onMouseMove) {
      onMouseMoveCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseMove]);
    }
    else {
      onMouseMoveCollection.delete(el);
    }
    if(interact.onMouseUp) {
      onMouseUpCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseUp]);
    }
    else {
      onMouseUpCollection.delete(el);
    }
  }
  ctx$$1.restore();
  transform.restore();
};
const isTouch = (`ontouchstart` in window);
const convertEventsToPosition = (evt) => {
  if(evt.clientX) {
    return [evt.clientX, evt.clientY];
  } else {
    const touch = evt.touches[0];
    return [touch.clientX, touch.clientY];
  }
};
const isInside = (point) => (geometry) => {
  switch(geometry.shape) {
    case `Circle`: return isPointInCircle(point, geometry.position, geometry.radius);
    case `Rectangle`: return isPointInAlignedRectangle(point, geometry.position, geometry.width, geometry.height);
    case `Polygon`: return isPointInPolygon(point, addListSet(rotateListAround(geometry.points, [0, 0], geometry.rotation), geometry.position));
    default: return false;
  }
};
const interactionHandler =
  (collection) =>
    (evt) => {
      if(collection.size) {
        const position = subtractSet(convertEventsToPosition(evt), [canvasOffsetLeft, canvasOffsetTop]);
        position[0] *= scaleX;
        position[1] *= scaleY;
        const isPositionInside = isInside(position);
        [...collection.values()]
          .filter(([_cEl, geometry]) => !geometry || isPositionInside(geometry))
          .forEach(([cEl, _geo, effect]) => effect(cEl, position));
      }
    };
const renderUI = (canvas$$1, base) => {
  const palette = createPalette(canvas$$1.getContext(`2d`));
  palette.clear();
  canvas$$1.addEventListener(
    isTouch ? `ontouchstart` : `mousedown`,
    interactionHandler(onMouseDownCollection),
  );
  canvas$$1.addEventListener(
    isTouch ? `ontouchmove` : `mousemove`,
    interactionHandler(onMouseMoveCollection),
  );
  canvas$$1.addEventListener(
    isTouch ? `ontouchend` : `mouseup`,
    interactionHandler(onMouseUpCollection),
  );
  return {
    palette,
    render: () => renderCEl(new Transform(), palette)(base),
  };
};

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

const inputs = {

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

// Display modal command selection.

const state = {
  // Dialog is an array of dialog data
  // dialog data is an array with the following values
  // [text:string,author?:[emoji:string,name:string]];
  // [
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis purus sed luctus dignissim. Phasellus hendrerit quam et urna tempor, eu porttitor dui feugiat. Praesent vestibulum est lectus, et vehicula velit laoreet non.',
  //   [avenger, `Avenger${Math.floor(Math.random() * 10)}`],
  // ]
  dialog: [],
  position: [0, 0],
};

// Display modal text.

let justDeleted = false;
let textStart = null;
const textSpeed = 50;


// Dialog box traits.
// Renders over bottom half of screen.
const stroke$2 = 2;
const dialogWidth = viewWidth - stroke$2;
const dialogHeight = viewHeight / 4;
const strokeColor$1 = `#fff`;
const bgColor$1 = `#00f`;

// Text traits.
const textSize$1 = 12;
const lineHeight$1 = textSize$1 * 1.2;
const textWidth$1 = dialogWidth - stroke$2 * 4;
const textHeight$1 = dialogHeight - stroke$2 * 4;
const textColor$1 = `#fff`;


// Formatted text is an array of lineData
// lineData is an array of the following values
// [x,y,text]
const formatText = (ctx$$1, text, maxChar) => {
  const formattedText = [];
  text = text.toUpperCase();

  ctx$$1.textBaseline = `top`;
  ctx$$1.font = `${textSize$1}px monospace`;

  const words = text.split(` `);
  let line = ``;
  let lineY = 0;
  let charCount = 0;
  // Add words to line one-by-one, test width.
  // Store when wide enough.
  for(const [index, word] of words.entries()) {
    const currLine = `${line + word} `;
    const metrics = ctx$$1.measureText(currLine);
    const currWidth = metrics.width;
    if(charCount + currLine.length > maxChar) {
      if(currWidth > textWidth$1) {
        formattedText.push([-textWidth$1 / 2, -textHeight$1 / 2 + lineY, line]);
        charCount += line.length;
        formattedText.push([-textWidth$1 / 2, -textHeight$1 / 2 + lineY + lineHeight$1, word.substr(0, maxChar - charCount)]);
      } else {
        formattedText.push([-textWidth$1 / 2, -textHeight$1 / 2 + lineY, currLine.substr(0, maxChar - charCount)]);
      }
      return formattedText;
    } else if(currWidth > textWidth$1 && index > 0) {
      formattedText.push([-textWidth$1 / 2, -textHeight$1 / 2 + lineY, line]);
      charCount += line.length;
      line = `${word} `;
      lineY += lineHeight$1;
    } else {
      line = currLine;
    }

  }

  formattedText.push([-textWidth$1 / 2, -textHeight$1 / 2 + lineY, line]);

  return formattedText;
};

const Dialog$2 = {
  geometry: createRectangle([viewWidth / 2, viewHeight - dialogHeight / 2], 0, dialogWidth, dialogHeight),
  render: (palette, { geometry }) => {
    const { dialog } = state;
    const [currentDialog] = dialog;
    if(!currentDialog) return;
    if(!textStart) textStart = Date.now();

    const { ctx: ctx$$1, fillRectangle, strokeRectangle, fillText } = palette;
    const maxChar = Math.floor((Date.now() - textStart) / textSpeed);
    fillRectangle(bgColor$1, [0, 0], geometry.width, geometry.height);
    strokeRectangle(strokeColor$1, [0, 0], geometry.width, geometry.height);

    // Render text
    const [text, author] = currentDialog;
    const formattedText = formatText(ctx$$1, text, maxChar);
    let offset = 0;
    if(author) {//author) {
      const [emoji, name] = author;
      const { width: nameWidth } = ctx$$1.measureText(name);
      const boxWidth = nameWidth + 16 + stroke$2 * 4;
      const leftOffset = -dialogWidth / 2 + nameWidth;
      const topOffset = -dialogHeight / 2 - stroke$2 * 2;
      fillRectangle(bgColor$1, [leftOffset, topOffset], boxWidth, lineHeight$1 + stroke$2 * 4);
      strokeRectangle(strokeColor$1, [leftOffset, topOffset], boxWidth, lineHeight$1 + stroke$2 * 4);
      ctx$$1.font = `${textSize$1}px monospace`;
      fillText({ style: textColor$1 }, [leftOffset - 6 + stroke$2 * 4 - boxWidth / 2, topOffset - lineHeight$1 / 2], emoji);
      fillText({ style: textColor$1 }, [leftOffset - 6 + stroke$2 * 4 - boxWidth / 2 + 16, topOffset - lineHeight$1 / 2], name);
      offset = lineHeight$1 / 2;
    }
    formattedText.forEach(([x, y, line]) => {
      fillText({ style: textColor$1 }, [x, y + offset], line);
    });

    if(maxChar >= text.length && inputs.space && !justDeleted) {
      state.dialog.shift();
      textStart = null;
      justDeleted = true;
    } else if(!inputs.space && justDeleted) {
      justDeleted = false;
    }
  },
  interact: {
    onMouseDown: () => {
      if(maxChar >= text.length) {
        state.dialog.shift();
        textStart = null;
      }
    },
  }
};

const { palette, render } = renderUI(canvas, {
  geometry: createRectangle([0, 0], 0, window.innerWidth, window.innerHeight),
  children: [Dialog$2],
});

palette.ctx.imageSmoothingEnabled = false;

const perspective =
  // camera coords in 3d space
  ([cX, cY, cZ]) =>
    // 2d point
    ([pX, pY]) => ([
      pX + pY * (cX - pX) / (pY + cY) - cX + viewWidth / 2,
      viewHeight - ((cY + pY) === 0 ? 0 : cZ * pY / (cY + pY)),
      Math.sqrt(Math.pow(cY + pY, 2) + Math.pow((cX - pX), 2)),
    ]);

const child = `\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF3E`;
const protector = `\uD83D\uDC6E\uD83C\uDFFF\u200D\u2640\uFE0F`;
const persecutor = `\uD83D\uDD75\uD83C\uDFFD`;
const avenger = `\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFA4`;

const tree = `\uD83C\uDF32`;
const treeAlt = `\uD83C\uDF33`;
const cloud = `\u2601\uFE0F`;



const pool = `\uD83C\uDF75`;
const diamond = `\uD83D\uDD37`;

const createSprite = (emoji) => ([x, y], z = 0) => ([x, y, z, emoji]);
const mkTree = createSprite(tree);
const mkTreeAlt = createSprite(treeAlt);
const mkChild = createSprite(child);
const mkProtector = createSprite(protector);
const mkPersecutor = createSprite(persecutor);
const mkAvenger = createSprite(avenger);
const mkCloud = createSprite(cloud);


const mkPool = createSprite(pool);
const mkDiamond = createSprite(diamond);

const camera = [0, 120, 200];

// state.dialog.push(
//   [
//     `I thought what I'd do was, I'd pretend I was one of those deaf-mutes.`,
//     [avenger, `Avenger`],
//   ], [
//     `Of polished desert-quarried marble were its walls, in height 300 cubits and in breadth 75,`,
//     [child, `Child`]
//   ], [
//     `so that chariots might pass each other as men drave them along the top.`,
//     [child, `Child`]
//   ], [
//     `For full 500 stadia did they run, being open only on the side toward the lake;`,
//     [protector, `Protector`]
//   ], [
//     `where a green stone sea-wall kept back the waves that rose oddly once a year`,
//     [protector, `Protector`]
//   ], [
//     `at the festival of the destroying of Ib.`,
//     [protector, `Protector`]
//   ], [
//     `In Sarnath were fifty streets from the lake to the gates of the caravans,`,
//     [persecutor, `Persecutor`]
//   ], [
//     `and fifty more intersecting them.`,
//     [persecutor, `Persecutor`]
//   ]);

let dt = 0;
let t = 0;


const groundPlane = createRectangle([0, 1600 / 2], 0, 10000, 1600);
const windowRect = createRectangle([0, 0], 0, viewWidth * 2, viewHeight * 2);

const { fillText, fillPolygon, strokePolygon, fillArc } = palette;

const groundGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
groundGradient.addColorStop(0, `#5E8C6A`);
groundGradient.addColorStop(1, `#BFB35A`);

const skyGradient = palette.ctx.createLinearGradient(0, 0, 200, 200);
skyGradient.addColorStop(0, `#69D2E7`);
skyGradient.addColorStop(1, `#A7DBD8`);

// Generate Trees
const objects = [];
let i = 1000;
while(--i > 0) {
  objects.push((Math.random() > 0.5 ? mkTree : mkTreeAlt)([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

i = 25;
while(--i > 0) {
  objects.push(mkCloud([
    Math.random() * 10000 - 5000,
    Math.random() * 1000 + 3500,
  ], Math.random() * 30 + 10));
}

i = 5;
while(--i > 0) {
  objects.push(mkPool([
    Math.random() * 5120 - 2560,
    Math.random() * 1280,
  ], 0));
}

const charSpeed = 3;
const direction = [0, 0];
const avngSprite = mkAvenger([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const chldSprite = mkChild([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const protSprite = mkProtector([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const persSprite = mkPersecutor([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);
const diamondSprite = mkDiamond([Math.random() * 20 - 10, Math.random() * 20 - 10], 0);

const calcFollow = (followPos) => (sprite, distance$$1) => {
  const relativePos = subtract(state.position, sprite);
  if(magnitude(relativePos) > distance$$1) {
    addSet(sprite, scaleToSet(relativePos, charSpeed));
  }
};

objects.push(avngSprite, chldSprite, protSprite, persSprite, diamondSprite);

requestAnimationFrame(function main() {
  dt = Math.min(16, Date.now() - t);
  camera[2] = 40 + (Date.now() % 3000) / 3000 * 120;

  // Game Logic
  direction[0] = 0;
  direction[1] = 0;
  if(inputs.w || inputs.up) {
    direction[1] += 1;
  }
  if(inputs.s || inputs.down) {
    direction[1] -= 1;
  }
  if(inputs.d || inputs.right) {
    direction[0] += 1;
  }
  if(inputs.a || inputs.left) {
    direction[0] -= 1;
  }
  addSet(state.position, scaleToSet(direction, charSpeed));
  state.position[1] = Math.max(state.position[1], 5);
  avngSprite[0] = state.position[0];
  avngSprite[1] = state.position[1];
  const follow = calcFollow(avngSprite);
  follow(chldSprite, 20 + Date.now() % 300 / 30);
  follow(protSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(diamondSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) {
    camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  }

  // Render Graphics
  palette.clear();
  const calcScreenPosition = perspective(camera);

  fillPolygon(
    skyGradient,
    [0, 0],
    windowRect.points,
  );

  fillPolygon(
    groundGradient,
    [0, 0],
    mapList(
      addList(groundPlane.points, groundPlane.position),
      calcScreenPosition,
    ),
  );

  [...objects]
    .map(point => [...calcScreenPosition(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji]) => fillText({}, [x, y - z], emoji));

  // Render UI
  render();

  t = Date.now();
  requestAnimationFrame(main);
});

}());
