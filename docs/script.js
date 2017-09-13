(function () {
'use strict';

function forEach(array, func) {
    let i = -1;
    while (++i < array.length)
        func(array[i], i, array);
    return array;
}
function reduce(array, func, base) {
    let i = -1;
    while (++i < array.length)
        base = func(base, array[i], i, array);
    return base;
}

const map = (array, func) => reduce(array, (result, value, index, array) => add$1(result, func(value, index, array)), []);


const filter = (array, func = (x) => !!x) => reduce(array, (result, value, index, array) => func(value, index, array)
    ? add$1(result, value)
    : result, []);














const contains = (array, value) => array.indexOf(value) !== -1;
const copy$1 = (array) => array.slice(0);
const clear = (array) => {
    while (array.length)
        array.pop();
    return array;
};


const add$1 = (array, value, index = 0) => {
    const result = copy$1(array);
    result.splice(index, 0, value);
    return result;
};

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

const isNumber = (x) => x && typeof x === 'number';
const isVector2d = (u) => u && isNumber(u[0]) && isNumber(u[1]);
const add = (vecA, vecB) => ([
    vecA[0] + vecB[0],
    vecA[1] + vecB[1]
]);
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
const scale = (vec, scale) => ([
    vec[0] * scale,
    vec[1] * scale
]);
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
function rotateSet(vec, rotation) {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const tmp = vec[0];
    vec[0] = round(vec[0] * c - vec[1] * s);
    vec[1] = round(tmp * s + vec[1] * c);
    return vec;
}

const scaleToSet = (vec, newMagnitude) => scaleSet(normalizeSet(vec), newMagnitude);


const sum = (vecs) => {
    const result = [0, 0];
    for (let i = vecs.length - 1; i >= 0; --i) {
        addSet(result, vecs[i]);
    }
    return result;
};
const average = (vecs) => scaleSet(sum(vecs), 1 / vecs.length);
function set(vec, x, y) {
    vec[0] = x;
    vec[1] = y;
    return vec;
}








const addList = (list, mod) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] + mod[0];
        result[i + 1] = list[i + 1] + mod[1];
    }
    return result;
};
const addListSet = (list, mod) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] += mod[0];
        list[i + 1] += mod[1];
    }
    return list;
};
const subtractList = (list, mod) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] - mod[0];
        result[i + 1] = list[i + 1] - mod[1];
    }
    return result;
};

const scaleList = (list, scale) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] * scale;
        result[i + 1] = list[i + 1] * scale;
    }
    return result;
};





const rotateList = (list, rotation) => {
    const result = [];
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = round(list[i] * c - list[i + 1] * s);
        result[i + 1] = round(list[i] * s + list[i + 1] * c);
    }
    return result;
};

const rotateListAround = (list, point, rotation) => addList(rotateList(subtractList(list, point), rotation), point);






const forEachList = (list, func) => {
    for (let i = 0; i < list.length; i += 2) {
        func([list[i], list[i + 1]], i / 2, list);
    }
};
const mapList = (list, func) => {
    const result = [];
    for (let i = 0; i < list.length; i += 2) {
        result.push(...func([list[i], list[i + 1]], i / 2, list));
    }
    return result;
};
const mapListSet = (list, func) => {
    for (let i = 0; i < list.length; i += 2) {
        list.splice(i, 2, ...func([list[i], list[i + 1]], i / 2));
    }
    return list;
};

/* General Type Discovery */
const is = (func = (x) => !!x) => (unknown) => func(unknown);

/* isGeometry */
const isPoint = is(x => x.shape === 'Point');
const isCircle = is(x => x.shape === 'Circle');
const isRectangle = is(x => x.shape === 'Rectangle');
const isPolygon = is(x => x.shape === 'Polygon');
/* Utilities */
const getRectanglePoints = (width, height) => ([
    -width / 2, +height / 2,
    -width / 2, -height / 2,
    +width / 2, -height / 2,
    +width / 2, +height / 2,
]);


/* Basic Geometry */


const createRectangle = (position, rotation = 0, width = 1, height = 1, label = '') => ({
    shape: 'Rectangle',
    label,
    position, rotation,
    width, height,
    points: getRectanglePoints(width, height),
});

/* Custom Geometry */


/* Utility Funcs */

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
const setCanvas = (newCanvas, canvasAttributes) => {
    canvas = newCanvas;
    const newContext = newCanvas.getContext('2d', canvasAttributes);
    if (newContext)
        ctx = newContext;
};
const originVector = [0, 0];
const translate = (vec) => ctx.translate(round(vec[0], 0), round(vec[1], 0));
const rotate$1 = (angle) => ctx.rotate(angle);
const clearRect = (vec, width, height) => ctx.clearRect(round(vec[0], 0), round(vec[1], 0), round(width, 0), round(height, 0));
const clear$1 = () => clearRect(originVector, canvas.width, canvas.height);
const moveTo = (vec) => ctx.moveTo(round(vec[0], 0), round(vec[1], 0));
const lineTo = (vec) => ctx.lineTo(round(vec[0], 0), round(vec[1], 0));
const quadraticCurveTo = (vec, control) => ctx.quadraticCurveTo(round(control[0], 0), round(control[1], 0), round(vec[0], 0), round(vec[1], 0));
const arc = (vec, radius, startAngle, endAngle, counterClockwise) => ctx.arc(round(vec[0], 0), round(vec[1], 0), radius, startAngle, endAngle, counterClockwise);
const rect = (vec, width, height) => ctx.rect(round(vec[0], 0), round(vec[1], 0), round(width, 0), round(height, 0));


const drawLine = (points, angle = 0) => {
    const origin = [points[0], points[1]];
    const adjustedPoints = subtractList(points, origin);
    ctx.save();
    translate(origin);
    rotate$1(angle);
    moveTo(originVector);
    forEachList(adjustedPoints, lineTo);
    ctx.restore();
};
const drawPolygon = (position, points, angle = 0) => {
    const first = [
        points[points.length - 2],
        points[points.length - 1],
    ];
    ctx.save();
    translate(position);
    rotate$1(angle);
    moveTo(first);
    forEachList(points, lineTo);
    ctx.restore();
};
const drawOval = (position, points, angle = 0) => {
    const midPoints = mapList(points, (pnt, i, array) => scaleSet(addSet(array[i * 2 - 2]
        ? [array[i * 2 - 2], array[i * 2 - 1]]
        : [array[array.length - 2], array[array.length - 1]], pnt), 0.5));
    ctx.save();
    translate(position);
    rotate$1(angle);
    moveTo([midPoints[0], midPoints[1]]);
    let i = 0;
    while ((i += 2) <= 9) {
        quadraticCurveTo(midPoints[i]
            ? [midPoints[i], midPoints[i + 1]]
            : [midPoints[0], midPoints[1]], [points[i - 2], points[i - 1]]);
    }
    ctx.restore();
};
const drawRectangle = (position, width, height, angle = 0) => {
    ctx.save();
    translate(position);
    rotate$1(angle);
    rect([-width / 2, -height / 2], round(width, 0), round(height, 0));
    ctx.restore();
};
const drawArc = (vec, radius = 100, angle = 0, startAngle = 0, endAngle = 2 * Math.PI, counterClockwise = false) => {
    ctx.save();
    translate(vec);
    rotate$1(angle);
    arc(originVector, radius, startAngle, endAngle, counterClockwise);
    ctx.restore();
};
const fill = (draw) => (style, ...args) => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = style;
    draw(...args);
    ctx.fill();
    ctx.restore();
};
const stroke = (draw) => (options, ...args) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = options.style || '';
    ctx.lineWidth = options.thickness || 1;
    draw(...args);
    ctx.stroke();
    ctx.restore();
};
const fillPolygon = fill(drawPolygon);
const fillOval = fill(drawOval);
const fillRectangle = fill(drawRectangle);
const fillLine = fill(drawLine);
const fillArc = fill(drawArc);
const strokePolygon = stroke(drawPolygon);
const strokeOval = stroke(drawOval);
const strokeRectangle = stroke(drawRectangle);
const strokeLine = stroke(drawLine);
const strokeArc = stroke(drawArc);

const fillText = (fontOptions, vec, text, angle = 0) => {
    ctx.save();
    ctx.fillStyle = fontOptions.style || '';
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    rotate$1(angle);
    if (fontOptions.horizontalAlign) {
        const { width } = ctx.measureText(text);
        translate([-width / 2, 0]);
    }
    ctx.fillText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
    ctx.restore();
};

// Reused DOM elements and objects.
const canvas$1 = document.querySelector(`canvas`);
setCanvas(canvas$1, { alpha: false });
ctx.imageSmoothingEnabled = false;
const viewWidth = 160;
const viewHeight = 192;

let canvasOffsetLeft = canvas$1.offsetWidth;
let canvasOffsetTop = canvas$1.offsetHeight;
let scaleX = 1;
let scaleY = 1;

canvas$1.width = viewWidth;
canvas$1.height = viewHeight;

const calcCanvasSize = () => {
  const { top, left, width, height } = canvas$1.getBoundingClientRect();
  canvasOffsetLeft = left;
  canvasOffsetTop = top;
  scaleX = viewWidth / width;
  scaleY = viewHeight / height;
};

calcCanvasSize();
document.addEventListener(`DOMContentLoaded`, calcCanvasSize);
window.addEventListener(`resize`, calcCanvasSize);

const child = `\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF3E`;
const protector = `\uD83D\uDC6E\uD83C\uDFFF\u200D`;
const persecutor = `\uD83D\uDD75\uD83C\uDFFD`;
const avenger = `\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFA4`;

const mask = `\uD83D\uDC7A`; // Boss 1
const winter = `\uD83C\uDF2C\uFE0F`; // Boss 2
const drama = `\uD83C\uDFAD`; // Boss 3
const dragon = `\uD83D\uDC09`; // Boss 4
const scorpion = `\uD83E\uDD82`; // Baddie 1
const bat = `\uD83E\uDD87`; // Baddie 2
const ghost = `\uD83D\uDC7B`; // Baddie 3
const skull = `\u2620\uFE0F`; // Baddie 4

const tree = `\uD83C\uDF32`;
const treeAlt = `\uD83C\uDF33`;
const cloud = `\u2601\uFE0F`;
const mountain = `\u26F0\uFE0F`;
const tulip = `\uD83C\uDF37`;
const pointRight = `\uD83D\uDC49\uD83C\uDFFB`;
const pool = `\uD83C\uDF75`;
const gem = `\uD83D\uDC8E`;

const heartBlack = `\uD83D\uDDA4`;
const heartGrow = `\uD83D\uDC97`;














const grass = `\uD83C\uDF31`;

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

const inputs = {

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

const updateInputs = () => {
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

const keyboardVector =
  (magnitude$$1) =>
    () => {
      const directional = [0, 0];
      if(inputs.up || inputs.w)++directional[1];
      if(inputs.down || inputs.s)--directional[1];
      if(inputs.left || inputs.a)--directional[0];
      if(inputs.right || inputs.d)++directional[0];
      return scaleToSet(directional, magnitude$$1);
    };

// colors

const white = `#fff`;
const boxBg = `#00f`;

// fonts
const header = `Arial Black, Gadget, sans-serif`;
const mono = `"Lucida Console", Monaco, monospace`;

// font styles
const textSize = 12;
const lineHeight = textSize * 1.1;

const title_text = `24px ${header}`;

const base_text = `${textSize}px ${mono}`;

// font objects
const statusBarHeartFont = { font: `6px mono` };
const statusBarFont = { style: white, font: `10px mono` };
const whiteFont = { style: white };

// stroke styles
const stroke$1 = 2;
const strokeOptions = {
  style: white,
  thickness: stroke$1,
};

// Common Draw Commands
const boxOffset = [0, -stroke$1 / 2];
const drawBox =
  (position, width, lines, height = 0) => {
    fillRectangle(boxBg, add(position, boxOffset), width, lines * lineHeight + height);
    strokeRectangle(strokeOptions, add(position, boxOffset), width, lines * lineHeight + height);
  };

const state = {
  // Dialog is an array of dialog data
  // dialog data is an array with the following values
  // [text:string,author?:[emoji:string,name:string]];
  // [
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis purus sed luctus dignissim. Phasellus hendrerit quam et urna tempor, eu porttitor dui feugiat. Praesent vestibulum est lectus, et vehicula velit laoreet non.',
  //   [avenger, `Avenger${Math.floor(Math.random() * 10)}`],
  // ]
  dialog: [],
  position: [-545, 700],
  target: null,
  logic: null,
  miasma: -550
};

const isNumber$1 = (x) => x && typeof x === 'number';
const originVector$1 = [0, 0];
class Transform {
    constructor() {
        this.apply = (geometry) => Object.assign(Object.create(null), geometry, {
            position: [...this.position],
            rotation: this.rotation,
        });
        this.position = originVector$1;
        this.rotation = 0;
        this.saved_positions = [];
        this.saved_rotations = [];
    }
    save() {
        this.saved_positions.push([this.position[0], this.position[1]]);
        this.saved_rotations.push(this.rotation);
    }
    restore() {
        if (this.saved_positions.length > 0) {
            const pos = this.saved_positions.pop();
            if (isVector2d(pos)) {
                this.position[0] = pos[0];
                this.position[1] = pos[1];
            }
            const rot = this.saved_rotations.pop();
            if (isNumber$1(rot))
                this.rotation = rot;
        }
    }
}

/* -1 === left, 0 === aligned, 1 === right */
const pointRelationToLine = (point, line) => sign((line[2] - line[0]) * (point[1] - line[1]) - (line[3] - line[1]) * (point[0] - line[0]));
const isPointInCircle = (point, position, radius) => magnitudeSqr(subtract(point, position)) <= sqr(radius);
const isPointInAlignedRectangle = (point, position, width, height) => Math.abs(point[0] - position[0]) <= width / 2 &&
    Math.abs(point[1] - position[1]) <= height / 2;
const isPointInPolygon = (point, points) => {
    let i = 0;
    let len = points.length;
    let next = 0;
    let relation = 0;
    while (true) {
        next = i === len - 2 ? 0 : i + 2;
        relation = pointRelationToLine(point, [points[i], points[i + 1], points[next], points[next + 1]]);
        if (relation === -1)
            return false;
        i += 2;
        if (i > len - 2)
            break;
    }
    return true;
};

const isCircleInAlignedRectangle = (positionA, radius, positionB, width, height) => isPointInAlignedRectangle(positionA, positionB, width, height) ||
    isPointInCircle(positionB, positionA, radius) ||
    (sqr(positionA[0] - Math.max(positionB[0], Math.min(positionA[0], positionB[0] + width))) +
        sqr(positionA[1] - Math.max(positionB[1], Math.min(positionA[1], positionB[1] + height)))) < sqr(radius);
const isAlignedRectangleInAlignedRectangle = (positionA, widthA, heightA, positionB, widthB, heightB) => !(Math.abs(positionB[0] - positionA[0]) > widthA / 2 + widthB / 2 ||
    Math.abs(positionB[1] - positionA[1]) > heightA / 2 + heightB / 2);
const isPolygonInPolygon = (positionA, pointsA, positionB, pointsB) => {
    if (isPointInPolygon(positionA, pointsB) ||
        isPointInPolygon(positionB, pointsA))
        return true;
    const length = Math.max(pointsA.length, pointsB.length);
    for (let i = 0; i < length; i += 2) {
        if ((i < pointsA.length && isPointInPolygon([pointsA[i], pointsA[i + 1]], pointsB)) ||
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
let windowGeometry = createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, 'window');
window.onresize =
    () => Object.assign(windowGeometry, createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, 'window'));
const isInViewport = (viewport = windowGeometry) => (cEl) => {
    const { geometry = { shape: null } } = cEl;
    switch (geometry.shape) {
        case 'Circle': return isCircleInAlignedRectangle(geometry.position, geometry.radius, viewport.position, viewport.width, viewport.height);
        case 'Rectangle': return isAlignedRectangleInAlignedRectangle(geometry.position, geometry.width, geometry.height, viewport.position, viewport.width, viewport.height);
        case 'Polygon': return isPolygonInPolygon(geometry.position, addListSet(rotateListAround(geometry.points, [0, 0], geometry.rotation), geometry.position), viewport.position, addListSet(rotateListAround(viewport.points, [0, 0], viewport.rotation), viewport.position));
        default: return true;
    }
};
const isInWindow = isInViewport(windowGeometry);
const renderCEl = (transform) => (el) => {
    const { geometry, children, render, interact } = el;
    ctx.save();
    transform.save();
    if (!!geometry) {
        translate(geometry.position);
        addSet(transform.position, rotate(geometry.position, transform.rotation));
        rotate$1(geometry.rotation);
        transform.rotation += geometry.rotation;
    }
    ctx.save();
    render && (!geometry || isInWindow(transform.apply(geometry))) && render(el);
    ctx.restore();
    children && forEach(children, renderCEl(transform));
    if (interact) {
        if (interact.onMouseDown) {
            onMouseDownCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseDown]);
        }
        else {
            onMouseDownCollection.delete(el);
        }
        if (interact.onMouseMove) {
            onMouseMoveCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseMove]);
        }
        else {
            onMouseMoveCollection.delete(el);
        }
        if (interact.onMouseUp) {
            onMouseUpCollection.set(el, [el, geometry && transform.apply(geometry), interact.onMouseUp]);
        }
        else {
            onMouseUpCollection.delete(el);
        }
    }
    ctx.restore();
    transform.restore();
};
const isTouch = ('ontouchstart' in window);
const convertEventsToPosition = (evt) => is(evt => !!evt.clientX)(evt)
    ? [evt.clientX, evt.clientY]
    : [evt.touches[0].clientX, evt.touches[0].clientY];
const isInside = (point) => (geometry) => {
    switch (geometry.shape) {
        case 'Circle': return isPointInCircle(point, geometry.position, geometry.radius);
        case 'Rectangle': return isPointInAlignedRectangle(point, geometry.position, geometry.width, geometry.height);
        case 'Polygon': return isPointInPolygon(point, addListSet(rotateListAround(geometry.points, [0, 0], geometry.rotation), geometry.position));
        default: return false;
    }
};
let offSetLeft = 0;
let offSetTop = 0;
let scaleX$1 = 1;
let scaleY$1 = 1;
const calcCanvasSize$1 = () => {
    const { top, left, width, height } = canvas.getBoundingClientRect();
    offSetLeft = left;
    offSetTop = top;
    scaleX$1 = canvas.width / width;
    scaleY$1 = canvas.height / height;
};
calcCanvasSize$1();
document.addEventListener('DOMContentLoaded', calcCanvasSize$1);
window.addEventListener('resize', calcCanvasSize$1);
const interactionHandler = (collection) => (evt) => {
    if (!!collection.size) {
        const position = subtractSet(convertEventsToPosition(evt), [offSetLeft, offSetTop]);
        position[0] *= scaleX$1;
        position[1] *= scaleY$1;
        const isPositionInside = isInside(position);
        forEach(filter([...collection.values()], ([_cEl, geometry]) => isPositionInside(geometry)), ([cEl, _geo, effect]) => effect(cEl, position));
    }
};
const renderUI = (canvas$$1, base) => {
    setCanvas(canvas$$1);
    canvas$$1.addEventListener(isTouch
        ? 'ontouchstart'
        : 'mousedown', interactionHandler(onMouseDownCollection));
    canvas$$1.addEventListener(isTouch
        ? 'ontouchmove'
        : 'mousemove', interactionHandler(onMouseMoveCollection));
    canvas$$1.addEventListener(isTouch
        ? 'ontouchend'
        : 'mouseup', interactionHandler(onMouseUpCollection));
    return () => {
        onMouseDownCollection.clear();
        onMouseMoveCollection.clear();
        onMouseUpCollection.clear();
        renderCEl(new Transform())(base);
    };
};

const uiElements = [];

const clearUi = () => { while(uiElements.length) uiElements.pop(); };

const render = renderUI(canvas$1, {
  geometry: createRectangle([canvas$1.width / 2, canvas$1.height / 2], 0, canvas$1.width, canvas$1.height),
  children: uiElements,
  render({ geometry }) {
    geometry.position[0] = canvas$1.width / 2;
    geometry.position[1] = canvas$1.height / 2;
    geometry.width = canvas$1.width;
    geometry.height = canvas$1.height;
    geometry.points = getRectanglePoints(geometry.width, geometry.height);
  },
});

let activeScene;

const Scene = (scene)=> {
  clearUi();

  scene.init();

  activeScene && activeScene.dismiss();

  activeScene = scene;
};

// Display modal text.

let textStart = null;
let maxChar = 0;
const textSpeed = 50;

// Dialog box traits.
// Renders over bottom half of screen.
const dialogWidth = viewWidth - stroke$1;
const dialogHeight = lineHeight * 5;

// Text traits.
const textWidth = dialogWidth - stroke$1 * 4;
const textHeight = dialogHeight - stroke$1 * 4;

// Formatted text is an array of lineData
// lineData is an array of the following values
// [x,y,text]
const formatText = (ctx$$1, text, maxChar) => {
  const formattedText = [];
  text = text.toUpperCase();

  ctx$$1.textBaseline = `top`;
  ctx$$1.font = `${textSize}px monospace`;

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
      if(currWidth > textWidth) {
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);
        charCount += line.length;
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY + lineHeight, word.substr(0, maxChar - charCount)]);
      } else {
        formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, currLine.substr(0, maxChar - charCount)]);
      }
      return formattedText;
    } else if(currWidth > textWidth && index > 0) {
      formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);
      charCount += line.length;
      line = `${word} `;
      lineY += lineHeight;
    } else {
      line = currLine;
    }
  }

  formattedText.push([-textWidth / 2, -textHeight / 2 + lineY, line]);

  return formattedText;
};

const Dialog = {
  geometry: createRectangle([0, viewHeight / 2 - dialogHeight / 2], 0, dialogWidth, dialogHeight),

  render: ({ geometry }) => {
    const [currentScript] = state.dialog;
    if(!currentScript) return;
    if(typeof currentScript === `function`) return state.dialog.shift()();
    if(!textStart) textStart = Date.now();

    maxChar = ((Date.now() - textStart) / textSpeed) | 0;
    drawBox([0, 0], geometry.width, 0, geometry.height);

    // Render text
    const [text, author] = currentScript;
    const formattedText = formatText(ctx, text, maxChar);
    let offset = 0;
    if(author) {
      const [emoji, name] = author;
      const { width: nameWidth } = ctx.measureText(name);
      const boxWidth = nameWidth + 16 + stroke$1 * 4;
      const leftOffset = -dialogWidth / 2 + nameWidth;
      const topOffset = -dialogHeight / 2 - stroke$1 * 2;
      drawBox([leftOffset, topOffset], boxWidth, 1, stroke$1 * 4);
      ctx.font = `${textSize}px monospace`;
      fillText(whiteFont, [leftOffset - 6 + stroke$1 * 4 - boxWidth / 2, topOffset - lineHeight / 2 - stroke$1], emoji);
      fillText(whiteFont, [leftOffset - 6 + stroke$1 * 4 - boxWidth / 2 + 16, topOffset - lineHeight / 2 - stroke$1], name);
      offset = lineHeight * 0.33;
    }
    formattedText.forEach(([x, y, line]) => {
      fillText(whiteFont, [x, y + offset], line);
    });

    if(inputs.space === 1 || inputs.click === 1) {
      if(maxChar < text.length) {
        textStart = 1;
      } else {
        state.dialog.shift();
        textStart = null;
      }
    }
  }
};

const focalLength = 500;
const camera = [0, 0, 240];

const perspective =
  // 2d point in world space
  (point) => {
    const [pX, pY] = subtract(point, camera);
    const cZ = camera[2];
    const relPos = (pY + focalLength);
    let sX = pX + pY * -pX / (pY + focalLength) + viewWidth / 2;
    let sY;
    if(relPos < 0) {
      sY = viewHeight + cZ * pY / relPos;
      sX = pX;
    } else if(relPos > 0) {
      sY = viewHeight - cZ * pY / relPos;
    } else {
      sY = viewHeight;
      sX = pX;
    }
    return [sX, sY, Math.pow(focalLength + pY, 2) + Math.pow(-pX, 2)];
  };

const perspective2d =
  (vector) =>
    perspective(vector).slice(0, 2);

const calcWorldPosition =
  ([sX, sY]) => {
    const cZ = camera[2];
    const pY = focalLength / (-cZ / (sY - viewHeight) - 1);
    const pX = -((viewWidth * pY) + (viewWidth * focalLength) + (-2 * sX * pY) + (-2 * sX * focalLength)) / (2 * focalLength);
    return addSet([pX, pY], camera);
  };

const getKeyboardVector = keyboardVector(3);

const controlCamera = () => addSet(camera, getKeyboardVector());

const islands = [];

const addIslandPiece = (position, radius) => {
  const basePoints = getRectanglePoints(radius * 2, radius * 2);
  const adjustedPoints = addList(basePoints, position);
  islands.push({
    position, radius,
    getBase: () => mapList(adjustedPoints, perspective2d),
    getShoreLine: (scale$$1) => mapListSet(addListSet(scaleList(basePoints, scale$$1), position), perspective2d),
    collision: (point, scale$$1 = 1) => isPointInCircle(point, position, radius * scale$$1),
  });
};

let xOffset = -1;
let yOffset = -1;
while(++xOffset < 9) {
  const newOffset = Math.abs(xOffset - 4);
  const len = 9 - newOffset;
  while(++yOffset < len) {
    addIslandPiece(
      [(xOffset - 5) * 100, 1000 + (newOffset / 2 + yOffset - 5) * 100],
      75 + Math.random() * 50
    );
  }
  yOffset = 0;
}





// export const isOnIsland =
//   ([x, y]) => sands.

// Display modal text.
// Menu([
//   [`CommandLabel1`, ()=> {
//     //Handler1
//   }],
//   [`CommandLabel2`, ()=> {
//     //Handler2
//   }]
// ]);

const Menu = (commands)=> {
  // Menu dimensions.
  let menuWidth = viewWidth/3;
  const menuHeight = lineHeight*commands.length + stroke$1*2;
  let menuX = viewWidth/2 - menuWidth/2 - stroke$1/2;
  const menuY = viewHeight/2 - menuHeight/2;

  let activeCommandIndex = 0;

  const children = [];

  // Create command render objects.
  for(const [index, [text, handler]] of commands.entries()) {
    const label = text.toUpperCase();

    const { width:textW } = ctx.measureText(label);
    menuWidth = Math.max(menuWidth, textW + stroke$1*4);

    children.push(
      {
        geometry: createRectangle(
          [
            -menuWidth/2 + stroke$1*2,
            -menuHeight/2 + lineHeight + index*lineHeight - stroke$1
          ], 0, menuWidth, lineHeight
        ),

        render() {
          fillText(whiteFont, [0, 0], label);

          // Render pointer hand.
          if(activeCommandIndex === index) {
            fillText({}, [-13, 0], pointRight);
          }
        },

        interact: {
          onMouseDown: handler,
          onMouseMove() {
            activeCommandIndex = index;
          }
        }
      }
    );
  }

  // Make sure all menu options align to the maximum menu width.
  for(const child$$1 of children) {
    child$$1.geometry.position[0] = -menuWidth/2 + stroke$1*2;
  }

  // Reposition menu.
  menuX = viewWidth/2 - menuWidth/2 - stroke$1/2;

  // Render menu.
  return {
    geometry: createRectangle([menuX, menuY], 0, menuWidth, menuHeight),

    children,

    render() {
      drawBox([0, 0], menuWidth, 0, menuHeight);

      // Keyboard controls.
      if(inputs.down === 1 && activeCommandIndex < commands.length - 1) {
        activeCommandIndex++;
      } else if(inputs.up === 1 && activeCommandIndex > 0) {
        activeCommandIndex--;
      }
      if(inputs.space === 1 || inputs.return === 1) {
        commands[activeCommandIndex][1]();
      }
    }
  };
};

const neighborPosition = [
    [0, 1, -1],
    [1, 0, -1],
    [1, -1, 0],
    [-1, 1, 0],
    [0, -1, 1],
    [-1, 0, 1],
];
const get = (grid) => ([q, r]) => {
    const radius = (grid.length - 1) / 2;
    const y = r + radius;
    const x = q + radius + Math.min(0, y - radius);
    return grid[y]
        ? grid[y][x]
        : null;
};
function roundHex(hex) {
    const rHex = [
        Math.round(hex[0]),
        Math.round(hex[1]),
        Math.round(hex[2]),
    ];
    const dHex = [
        Math.abs(rHex[0] - hex[0]),
        Math.abs(rHex[1] - hex[1]),
        Math.abs(rHex[2] - hex[2]),
    ];
    if (dHex[0] > dHex[1] && dHex[0] > dHex[2]) {
        rHex[0] = -rHex[1] - rHex[2];
    }
    else if (dHex[1] > dHex[2]) {
        rHex[1] = -rHex[0] - rHex[2];
    }
    else {
        rHex[2] = -rHex[0] - rHex[1];
    }
    return rHex;
}
const hexToVector2d = (hex) => ([
    Math.sqrt(3) * (hex[0] + hex[1] / 2),
    3 / 2 * hex[1]
]);
const vector2dToHex = (vec) => {
    const [x, y] = vec;
    const hex = [0, 0, 0];
    hex[0] = x * Math.sqrt(3) / 3 - y / 3;
    hex[1] = y * 2 / 3;
    hex[2] = -(hex[0] + hex[1]);
    return roundHex(hex);
};
const getFromVector2d = (grid) => (vec) => get(grid)(vector2dToHex(vec));
const convertQRToXYZ = (qr) => ([qr[0], qr[1], -qr[0] - qr[1]]);
const distanceFromTo = (hex, targetHex) => (Math.abs(hex[0] - targetHex[0]) +
    Math.abs(hex[1] - targetHex[1]) +
    Math.abs(hex[2] - targetHex[2])) / 2;

const addGrid = (grid) => (hexA) => (hexB) => get(grid)([
    hexA[0] + hexB[0],
    hexA[1] + hexB[1],
]);



const getNeighborsGrid = (grid) => (hex) => filter(map(neighborPosition, addGrid(grid)(hex)));





const getWithinGrid = (grid) => (hex, radius) => {
    const hexes = [];
    for (let dx = -radius; dx <= radius; ++dx) {
        const limit = Math.min(radius, -dx + radius);
        for (let dy = Math.max(-radius, -dx - radius); dy <= limit; ++dy) {
            hexes.push(get(grid)([
                dx + hex[0],
                -dx - dy + hex[1],
            ]));
        }
    }
    return filter(hexes);
};






const generateGrid = (radius) => {
    let rows = radius * 2 + 1;
    const grid = [];
    for (let y = 0; y < rows; ++y) {
        const row = y <= radius
            ? radius + 1 + y
            : radius * 3 + 1 - y;
        for (let x = 0; x < row; ++x) {
            if (!grid[y])
                grid[y] = [];
            grid[y][x] = convertQRToXYZ([
                -radius - Math.min(0, y - radius) + x,
                y - radius,
            ]);
        }
    }
    return grid;
};

const merge = (left, right, func) => {
    const result = [];
    while (left.length && right.length) {
        if ((func(left[0]) || 0) <= (func(right[0]) || 0)) {
            result.push(left.shift() || left[0]);
        }
        else {
            result.push(right.shift() || right[0]);
        }
    }
    while (left.length)
        result.push(left.shift() || left[0]);
    while (right.length)
        result.push(right.shift() || right[0]);
    return result;
};
function mergeSort(array, func) {
    if (array.length < 2)
        return array;
    const middle = Math.floor(array.length / 2);
    return merge(mergeSort(array.slice(0, middle), func), mergeSort(array.slice(middle), func), func);
}

const pathTo = (getNeighbors, resist, heuristic, maxResist = Infinity) => (start, goal) => {
    let frontier = [[start, heuristic(goal, start)]];
    const came_from = new Map();
    const cost_so_far = new Map();
    came_from.set(start, null);
    cost_so_far.set(start, 0);
    let current = start;
    while (frontier.length) {
        const [current] = frontier.shift();
        const current_cost = cost_so_far.get(current);
        if (current === goal)
            break;
        if (current_cost >= maxResist)
            return null;
        forEach(getNeighbors(current), neighbor => {
            const new_cost = current_cost + resist(current, neighbor);
            const old_cost = cost_so_far.get(neighbor);
            if (!old_cost || new_cost < old_cost) {
                cost_so_far.set(neighbor, new_cost);
                const priority = new_cost + heuristic(goal, neighbor);
                frontier.push([neighbor, priority]);
                came_from.set(neighbor, current);
            }
        });
        frontier = mergeSort(frontier, ([, value]) => value);
    }
    const path = [];
    current = goal;
    while (current !== start) {
        path.unshift(current);
        current = came_from.get(current);
    }
    return path;
};

const animateFoward =
  (duration, offset = Date.now() % duration) =>
    () =>
      Math.min((Date.now() + offset) % duration / duration, 1);

const animateFowardNoRepeat =
  (duration, offset) => {
    const start = Date.now();
    let value = 0;
    const anim = animateFoward(duration, offset);
    return () => Date.now() - start < duration
      ? value = Math.max(value, anim())
      : 1;
  };

// no easing; no acceleration

// accelerating from zero velocity

// decelerating to zero velocity

// acceleration until halfway; then deceleration

// accelerating from zero velocity

// decelerating to zero velocity

// acceleration until halfway; then deceleration

// accelerating from zero velocity

// decelerating to zero velocity

// acceleration until halfway; then deceleration
const easeInOutQuart = t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
// accelerating from zero velocity

// decelerating to zero velocity

// acceleration until halfway; then deceleration

var characterData = {

  /* The Good Guys */

  child: {
    name: `Child`,
    emoji: child,
    type: true,
    maxHealth: 40,
    abilities: {
      move: {
        range: 3,
      },
      magic: {
        range: 4,
        effect: 10,
        duration: 5
      },
    },
  },

  avenger: {
    name: `Avenger`,
    emoji: avenger,
    type: true,
    maxHealth: 80,
    abilities: {
      move: {
        range: 3,
      },
      attack: {
        name: `Avenge`,
        range: 1,
        damage: 25,
      }
    },
  },

  protector: {
    name: `Protector`,
    emoji: protector,
    type: true,
    maxHealth: 100,
    abilities: {
      move: {
        range: 2,
      },
      defend: {
        range: 1,
        duration: 1,
        percentage: 1,
      },
    },
  },

  persecutor: {
    name: `Persecutor`,
    emoji: persecutor,
    type: true,
    maxHealth: 60,
    abilities: {
      move: {
        range: 5,
      },
      attack: {
        count: 10,
        range: 4,
        damage: 30,
      },
      defend: {
        count: 10,
        range: 3,
        percentage: 0.5,
        duration: 3,
      },
      magic: {
        count: 10,
        range: 1,
        effect: 50,
        duration: 1
      },
      reset: {
        count: 3
      },
    },
  },

  /* The Bad Guys */

  swarmer: {
    name: `Swarmer`,
    emoji: scorpion,
    type: false,
    maxHealth: 30,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 1,
        damage: 10,
      }
    }
  },

  vamp: {
    name: `Vamp`,
    emoji: bat,
    type: false,
    maxHealth: 40,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiMagic: {
        range: 1,
        duration: 1,
        effect: 5,
      }
    }
  },

  skeli: {
    name: `Skeli`,
    emoji: skull,
    type: false,
    maxHealth: 40,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiAttack: {
        range: 1,
        damage: 20,
      },
      aiDefend: {
        range: 1,
        duration: 1,
        percentage: 0.25,
      }
    }
  },

  resentment: {
    name: `Resentment`,
    emoji: mask,
    isBoss: true,
    type: false,
    maxHealth: 60,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiAttack: {
        range: 1,
        damage: 40,
      },
    }
  },

  doubt: {
    name: `Doubt`,
    emoji: winter,
    isBoss: true,
    type: false,
    maxHealth: 120,
    abilities: {
      aiAttack: {
        range: 10,
        damage: 30,
      },
    }
  },

  deceit: {
    name: `Deceit`,
    emoji: drama,
    isBoss: true,
    type: false,
    maxHealth: 120,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 1,
        damage: 20,
      },
      aiMagic: {
        range: 3,
        effect: 10,
        duration: 3,
      },
      aiDefend: {
        range: 2,
        duration: 2,
        percentage: 0.25,
      },
    }
  },

  harm: {
    name: `Harm`,
    emoji: dragon,
    isBoss: true,
    type: false,
    maxHealth: 120,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 3,
        damage: 20,
      },
      aiMagic: {
        range: 3,
        effect: 10,
        duration: 3,
      },
      aiDefend: {
        range: 2,
        duration: 2,
        percentage: 0.25,
      },
    }
  },

};

const cameraOffset$1 = [0, -150];



const grid = generateGrid(5);
const optionHexes = [];
const turnOrder = [];

const initializeMap = (characters) => {
  clear(turnOrder);
  turnOrder.push(...characters.map(([name, position]) => ([
    characterData[name], // Store Character Data
    characterData[name].maxHealth, // Set Health at start to max Health
    scaleSet(hexToVector2d(position), 20), // Set Position to a Vector instead of hex
    [], // Array of status Effects
  ])));
};

const getHexFromVector2d = getFromVector2d(grid);
const getGridHexFromVector2d =
  position =>
    getHexFromVector2d(scale(position, 1 / 20));
const getGridHexFromClick =
  position =>
    getGridHexFromVector2d(calcWorldPosition(position));
const getVector2dFromHex =
  hex =>
    scaleSet(hexToVector2d(hex), 20);



const getPathToTarget = pathTo(
  getNeighborsGrid(grid),
  (_, dst) => getCharacterAtHex(dst) ? 40 : 1,
  (hex, dest) => distanceFromTo(hex, dest),
  1000
);

const getGridHexesWithin = getWithinGrid(grid);
const getMovementOptions =
  (position, movement) =>
    getGridHexesWithin(position, movement)
      .filter(hex => !turnOrder.find(([, health, position]) => getGridHexFromVector2d(position) === hex && health > 0));

const getNearbyCharacters =
  (type) =>
    (position, range) =>
      turnOrder.filter(
        ([data, health, cPosition]) =>
          (type === null || data.type === type) &&
          health > 0 &&
          distanceFromTo(getGridHexFromVector2d(position), getGridHexFromVector2d(cPosition)) <= range
      );

const getNearbyCharacterHexes =
  (fetch) =>
    (position, range) =>
      fetch(position, range)
        .map(([, , position]) => getGridHexFromVector2d(position));

const getNearbyAllies = getNearbyCharacters(true);
const getNearbyEnemies = getNearbyCharacters(false);

const getCharacterAtHex =
  (hex) =>
    turnOrder.find(([, health, position]) => getGridHexFromVector2d(position) === hex && health > 0);

const moveCharacter =
  (position, destination, duration) => {
    const start = [...position];
    const diff = subtractSet([...destination], start);
    const progress = animateFowardNoRepeat(duration);
    return () => {
      const delta = easeInOutQuart(progress());
      set(position, ...addSet(scale(diff, delta), start));
      return delta === 1;
    };
  };

/*
TODO:
[ ] Render enemies names differently (font? color?)
*/

const textSize$1 = 12;
const lineHeight$1 = textSize$1 * 1.2;

const StatusBar = ({
  geometry: createRectangle([0, -viewHeight / 2 + lineHeight$1 / 2], 0, viewWidth, lineHeight$1),
  render() {
    const character = getCharacterAtHex(state.target);
    if(!character) return;
    const [entity, health] = character;
    const { maxHealth, name } = entity;
    let heartContainers = Math.ceil(maxHealth / 10) + 1;
    let filledContainers = Math.ceil(health / 10) + 1;
    while(--heartContainers >= 0) fillText(statusBarHeartFont, [(viewWidth / 2 - 11) - 8 * heartContainers, 2], heartBlack);
    while(--filledContainers >= 0) fillText(statusBarHeartFont, [(viewWidth / 2 - 11) - 8 * filledContainers, 2], heartGrow);
    fillText(statusBarFont, [-viewWidth / 2, 2], name);
  }
});

const createPool$1 =
  (baseColor, shoreColor) =>
    (baseSize, position, callBack, display = true) => {
      const offset = ((Math.random() * 500)) | 0;
      const interval = 1800 + ((Math.random() * 1000) | 0);
      const speed = baseSize * 12;
      const basePoints = getRectanglePoints(baseSize * 2, baseSize * 2);
      const placedPoints = addList(basePoints, position);
      let adjustedPoints;
      const toggle = {
        display
      };
      const collision =
        (size) =>
          (targetPosition) =>
            magnitudeSqr(subtract(targetPosition, position)) <= size * size;
      const test = (targetPosition) => {
        if(toggle.display && callBack && collision(baseSize)(targetPosition)) {
          callBack();
          callBack = null;
        }
      };
      const render = () => {
        adjustedPoints = mapList(placedPoints, perspective2d);

        if(!toggle.display) {
          return;
        }

        fillOval(
          baseColor,
          [0, 0],
          adjustedPoints,
        );

        const rippleScale = (Date.now() + offset) % interval / speed;

        strokeOval(
          { style: shoreColor, thickness: 1 },
          [0, 0],
          mapList(
            addListSet(
              scaleList(
                basePoints,
                rippleScale > 1
                  ? 0
                  : rippleScale
              ),
              position
            ),
            perspective2d,
          ),
        );

        strokeOval(
          { style: shoreColor, thickness: 2 },
          [0, 0],
          adjustedPoints,
        );

      };
      return {
        propCollision: collision(2 * baseSize),
        collision: collision(baseSize * 0.5),
        test,
        render,
        toggle,
      };
    };

const makeAvengerPool = createPool$1(`#F9CDAD`, `#FE4365`); // Pink/gray
const makeChildPool = createPool$1(`#EDE574`, `#F9D423`); // orange/yellow
const makeProtectorPool = createPool$1(`#69D2E7`, `#E0E4CC`); // Blue
const makePersecutorPool = createPool$1(`#CFF09E`, `#3B8686`); // Green
const makeOriginalPool = createPool$1(`#EDEDF2`, `#CFD5E1`); // Gray/White
const makeEvilPool = createPool$1(`#4F364C`, `#8F9E6F`); // Purple/Green

// const selectColor = `#fcfc68`;
const optionColor = `#8f9e6f`;

const baseSquarePoints = getRectanglePoints(15, 15);

const calculatePoints = (hex, scale$$1 = 1) =>
  mapListSet(
    addList(
      scale$$1 === 1
        ? baseSquarePoints
        : getRectanglePoints(15 * scale$$1, 15 * scale$$1),
      scaleSet(hexToVector2d(hex), 20)
    ),
    perspective2d
  );

const drawFill =
  (hex) => {
    if(!hex) return;
    if(state.target === hex) {
      strokeOval({ style: optionColor }, [0, 0], calculatePoints(hex, Math.min(Date.now() % 2000 / 1000), 1));
    } else {
      strokeOval({ style: optionColor }, [0, 0], calculatePoints(hex));
    }
  };

// TODO: Draw different things based on status effects (hots/dots).
const entityTextStyle = ({ name, isBoss }) => ({ horizontalAlign: true, font: `${isBoss ? (name === `Harm` ? 30 : 20) : 12}px mono` });

const hasStatus =
  (status, match) =>
    !!status.find(({ type }) => type === match);


const checkStatus =
  (name, style, icon, offset) =>
    (position, status) =>
      hasStatus(status, name)
        ? fillText({ style, font: `6px mono` }, [position[0] + offset, position[1] + 5], icon)
        : null;


const checks = [
  checkStatus(`shield`, `#0064fa`, `S`, -5),
  checkStatus(`heal`, `#32fa00`, `H`, 0),
  checkStatus(`damage`, `#fa3200`, `D`, 5),
];

const drawEntity =
  ([data, health, position, status]) => {
    if(health > 0) {
      const adjustedPosition = perspective2d(position);
      fillText(entityTextStyle(data), adjustedPosition, data.emoji);
      checks.forEach(check => check(adjustedPosition, status));
    } else if(data.type) {
      //render DEAD GUY
    }
  };

const skyGradient = ctx.createLinearGradient(0, 0, 100, 100);
skyGradient.addColorStop(0, `#F07241`);
skyGradient.addColorStop(1, `#601848`);

const basePool = makeEvilPool(200, [0, 0]);

var BattleMap = ({
  geometry: createRectangle([-viewWidth / 2, -viewHeight / 2], 0, viewWidth, viewHeight),
  render() {
    // Background
    fillRectangle(
      skyGradient,
      [0, 0],
      viewWidth * 2,
      viewHeight * 2,
      0,
    );
    basePool.render();
    [...optionHexes, state.target].forEach(drawFill);
    mergeSort([...turnOrder], ([, , [, y]]) => -y).forEach(drawEntity);
  }
});

const dealDamage = (defChar, damage) => {
  const [, , , status] = defChar;
  const shield = status.find(({ type }) => type === `shield`);
  if(shield) damage *= (1 - shield.effect);
  defChar[1] -= damage;
};

const heal =
  (defChar, heal) =>
    defChar[1] = Math.min(defChar[1] + heal, defChar[0].maxHealth);

const handlStatuses = (character) => {
  const [, , , statuses] = character;
  character[3] = statuses.map((status) => --status.duration < 0 ? false : status).filter(x => x);
  statuses.forEach(status => {
    switch(status.type) {
      case `damage`:
        dealDamage(character, status.effect);
        break;
      case `heal`:
        heal(character, status.effect);
        break;
    }
  });
};

function* MoveCharacterOnPath(position, path) {
  let i = -1;
  while(++i < path.length) {
    const targetPosition = getVector2dFromHex(path[i]);
    const runCharacter = moveCharacter(position, targetPosition, 500);
    while(!runCharacter()) {
      set(camera, ...add(cameraOffset$1, position));
      yield;
    }
  }
}

function* UserSelectLocation(options) {
  let selectedLocation = null;
  state.target = null;
  clear(optionHexes);
  optionHexes.push(...options);
  while(!selectedLocation) {
    controlCamera();
    const { click, mousePosition } = inputs;
    if(click === 1) {
      state.target = getGridHexFromClick(mousePosition);
      if(contains(options, state.target)) selectedLocation = state.target;
    }
    yield;
  }
  clear(optionHexes);
  return selectedLocation;
}

function* PanCameraTo(target) {
  const animateTo = moveCharacter(camera, add(cameraOffset$1, target), 2000);
  while(!animateTo()) yield;
}

function* GetUserSelectTarget(fetch, position, range) {
  const options = fetch(position, range);
  if(!options.length) return null;
  const selectedLocation = yield* UserSelectLocation(options);
  return getCharacterAtHex(selectedLocation);
}

function* Attack([{ abilities: { attack: { damage, range } } }, , position]) {
  const target = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyEnemies), position, range);
  if(!target) return yield* Move(arguments[0]);
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
}

function* Defend([{ abilities: { defend: { range, duration, percentage } } }, , position]) {
  getNearbyAllies(position, range)
    .forEach(([, , , status]) => status.push({
      type: `shield`,
      duration,
      percentage,
    }));
  yield;
}

function* Magic([{ type, abilities: { magic: { effect, range } } }, , position]) {
  const target = yield* GetUserSelectTarget(getNearbyCharacterHexes(getNearbyCharacters(null)), position, range);
  if(!target) return yield* Move(arguments[0]);
  const [{ type: tType }, , tPosition, tStatus] = target;
  tStatus.push({
    type: type === tType
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(tPosition);
}

function* Item(character) {
  const [{ abilities: { attack, defend, magic } }] = character;
  let selectedAction = null;
  const actions = [
    attack.count && [`Abuse (${attack.count})`, () => {
      --attack.count;
      selectedAction = Attack;
    }],
    defend.count && [`Pretend (${defend.count})`, () => {
      --defend.count;
      selectedAction = Defend;
    }],
    magic.count && [`Critique (${magic.count})`, () => {
      --magic.count;
      selectedAction = Magic;
    }],
  ].filter(x => x);

  const menuUIIndex = uiElements.push(Menu(actions)) - 1;
  while(!selectedAction) yield;
  uiElements.splice(menuUIIndex, 1);
  yield* selectedAction(character);
}

function* Move([{ abilities: { move: { range } } }, , position]) {
  const positionHex = getGridHexFromVector2d(position);
  const selectedLocation = yield* UserSelectLocation(getMovementOptions(positionHex, range));
  yield* PanCameraTo(position);
  yield* MoveCharacterOnPath(position, getPathToTarget(positionHex, selectedLocation));
}

/* Abilities */

function* AIAttack(character, nearbyGoodGuys) {
  const [{ abilities: { aiAttack: { damage } } }] = character;
  const target = mergeSort(nearbyGoodGuys, ([, health]) => health)[0];
  dealDamage(target, damage);
  yield* PanCameraTo(target[2]);
  yield;
}


function* AIDefend(character, nearbyEnemies) {
  const [{ abilities: { aiDefend: { duration, percentage } } }] = character;
  const target = mergeSort(nearbyEnemies, ([, health]) => -health)[0];
  const [, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({ type: `shield`, duration, percentage });
  yield* PanCameraTo(target[2]);
  yield;
}

function* AIMagic(character, nearbyGoodGuys) {
  const [{ type, abilities: { aiMagic: { effect } } }] = character;
  const target = mergeSort(nearbyGoodGuys, ([, health]) => -health)[0];
  const [tData, , tPosition, tStatus] = target;
  yield* PanCameraTo(tPosition);
  tStatus.push({
    type: type === tData.type
      ? `heal`
      : `damage`,
    effect,
  });
  yield* PanCameraTo(target[2]);
  yield;
}

/* Movement */

const getAIPath = (position, tPosition, range) => {
  const path = getPathToTarget(
    getGridHexFromVector2d(position),
    getGridHexFromVector2d(tPosition)
  ).splice(0, range);
  path.pop();
  return path;
};

function* AIMove([{ abilities: { aiMove: { range, type } } }, , position]) {
  yield* PanCameraTo(position);
  const goodGuys = mergeSort(
    getNearbyAllies(position, 100),
    ([, , aPosition]) => type
      ? getNearbyEnemies(aPosition, 1).length
      : getNearbyAllies(aPosition, 1).length
  );
  if(goodGuys[0]) yield* MoveCharacterOnPath(position, getAIPath(position, goodGuys[0][2], range));
}

/* Behaviors */

function* Swarmer(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) yield* AIAttack(character, nearbyGoodGuys);
  else yield* AIMove(character);
  yield;
}

function* Vamp(character) {
  const [{ abilities: { aiMagic: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  if(nearbyGoodGuys.length) yield* AIMagic(character, nearbyGoodGuys);
  else yield* AIMove(character);
  yield;
}

function* Skeli(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  if(nearbyGoodGuys.length === 0) {
    yield* AIMove(character);
  } else if(nearbyBadGuys.length > nearbyGoodGuys.length) {
    yield* AIDefend(character, nearbyBadGuys);
  } else {
    yield* AIAttack(character, nearbyGoodGuys);
  }
  yield;
}

function* Resentment(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  if(nearbyGoodGuys.length === 0) {
    yield* AIMove(character);
  } else {
    yield* AIAttack(character, [...nearbyBadGuys, ...nearbyGoodGuys]);
  }
  yield;
}

function* Deceit(character) {
  const [{ abilities: { aiAttack: { range }, aiMagic: { range: magRange } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range);
  const nearbyBadGuys = getNearbyEnemies(position, range);
  const dotHotable = [...getNearbyAllies(position, magRange), ...getNearbyEnemies(position, magRange)];
  if(nearbyGoodGuys.length > 1) {
    yield* AIAttack(character, nearbyGoodGuys);
  } else if(nearbyBadGuys.length > 1) {
    yield* AIDefend(character, nearbyBadGuys);
  } else if(dotHotable.length) {
    yield* AIMagic(character, [...nearbyGoodGuys, ...nearbyBadGuys]);
  } else {
    yield* AIMove(character);
  }
  yield;
}

function* Doubt(character) {
  const [{ abilities: { aiAttack: { range } } }, , position] = character;
  const nearbyGoodGuys = getNearbyAllies(position, range).filter(
    ([, , , statuses]) => statuses.find(({ type }) => type === `damage`)
  );
  if(nearbyGoodGuys.length) yield* AIAttack(character, nearbyGoodGuys);
  yield;
}

/*
How to create a battle scene.
Scene(createBattleScene([
  [`avenger`, [0, 0, 0]],
  [`child`, [1, 0, -1]],
  [`protector`, [-1, 1, 0]],
  [`persecutor`, [-1, 0, 1]],
],5));
*/

// import Song from 'audio';
// import battleMusic from 'songs/summer';
// import finalBossMusic from 'songs/winter';
const cameraOffset = [0, -150];

function* generateGetCharacter(turnOrder$$1) {
  let i = 0;
  while(true) {
    const char = turnOrder$$1[i % (turnOrder$$1.length)];
    ++i;
    const [, health] = char;
    if(health > 0) {
      yield char;
    }
  }
}

let harmTurns = 0;

const baseArray = [
  [`avenger`, [0, 0, 0]],
  [`child`, [1, 0, -1]],
  [`protector`, [-1, 1, 0]],
  [`persecutor`, [-1, 0, 1]],
];

const randomEnemyLocation = () => getGridHexFromVector2d(
  rotateSet(
    scaleSet(
      [0, 1],
      60 + Math.random() * 100
    ),
    Math.random() * Math.PI
  )
);

const generateBattle =
  (swarmers, vamps, skelis, boss) => {
    const battle = [...baseArray];
    let i = -1;
    const len = Math.max(swarmers, vamps, skelis);
    while(++i < len) {
      if(i < swarmers) battle.push([`swarmer`, randomEnemyLocation()]);
      if(i < vamps) battle.push([`vamp`, randomEnemyLocation()]);
      if(i < skelis) battle.push([`skeli`, randomEnemyLocation()]);
    }
    boss && battle.push([boss, randomEnemyLocation()]);
    return battle;
  };

function createBattleScene(swarmers, vamps, skelis, boss) {
  const characters = generateBattle(swarmers, vamps, skelis, boss);
  initializeMap(characters);

  let turn = null;
  let selectedAction = null;
  const action = {
    // Player Controlled Character Movement
    move: [`Move`, () => selectedAction = Move],
    attack: [`Avenge`, () => selectedAction = Attack],
    defend: [`Protect`, () => selectedAction = Defend],
    magic: [`Forget`, () => selectedAction = Magic],
    item: [`Use`, () => selectedAction = Item],
    swarmer: Swarmer,
    vamp: Vamp,
    skeli: Skeli,
    resentment: Resentment,
    doubt: Doubt,
    deceit: Deceit,
    *harm() {
      yield* [Doubt, Resentment, Deceit][++harmTurns % 9 / 3 | 0];
    }
  };

  const getCharacter = generateGetCharacter(turnOrder);
  function* Turn() {
    // 1) Determine who's turn it is.
    const { value: character } = getCharacter.next();
    const [data, , position] = character;
    state.target = getGridHexFromVector2d(position);
    // 2) Center Camera on that person.
    const panCamera = moveCharacter(camera, add(cameraOffset, position), 2000);
    while(!panCamera()) yield;
    // 3) Look up actions
    selectedAction = null;
    if(data.type) {
      let actions;
      switch(data.name) {
        case `Persecutor`:
          actions = [
            action.move,
            action.item,
          ];
          break;
        default:
          actions = Object.keys(data.abilities).map(name => action[name]);
        // 4) Add actions to the menu
      }
      const menuUIIndex = uiElements.push(Menu(actions));
      // 5) Wait for player to select an action.
      while(!selectedAction) yield;
      uiElements.splice(menuUIIndex - 1, 1);
    } else {
      selectedAction = action[data.name.toLowerCase()];
    }
    // 6) Execute selected action
    yield* selectedAction(character);
    handlStatuses(character);
    // 7) Check to see if battle is over
    const isVictory = false;//!!turnOrder.find(([data, health]) => !data.alignment && health > 0);
    const isDefeat = false;//!isVictory && !!turnOrder.find(([data, health]) => data.alignment && health > 0);
    return isVictory ? 1 :
      isDefeat ? 2 :
        0;
  }

  // const bgMusic = new Song(battleMusic || finalBossMusic);

  return {
    init: () => {
      // bgMusic.play(bgMusic);
      camera[2] = 340;
      uiElements.push(BattleMap, StatusBar);
      turn = Turn();
      state.logic = () => {
        // done: is turn over.
        // value: battle status, 0: ongoing, 1: victory, 2: defeat;
        const { value, done } = turn.next();
        if(done && value === 0) {
          // 8) Increment turn counter
          // 9A) Create New turn
          turn = Turn();
        } else if(done && value === 1) {
          // 9B) VICTORY
          Scene(overworld);
        } else if(done && value === 2) {
          const characters = generateBattle(swarmers, vamps, skelis, boss);
          initializeMap(characters);
        }
      };
    },
    dismiss: () => {
      // bgMusic.stop();

    },
  };
}

// size is a scale relative to 16px.
const createSprite = (emoji, size = 1) => ([x, y], z = 0) => ([x, y, z, emoji, size]);
const mkTree = createSprite(tree, 2);
const mkTreeAlt = createSprite(treeAlt, 2);
const mkChild = createSprite(child);
const mkProtector = createSprite(protector);
const mkPersecutor = createSprite(persecutor);
const mkAvenger = createSprite(avenger);
const mkCloud = createSprite(cloud);
const mkMountain = createSprite(mountain, 4);
const mkTulip = createSprite(tulip, 0.5);
const mkGrass = createSprite(grass, 0.25);
const mkGhost = createSprite(ghost);
const mkPool = createSprite(pool);
const mkGem = createSprite(gem);

// Play a "movie" using text and/or cEl render objects.
// Movie(
//   x, y, w, h,
//   movieObject,
//   ()=> {
//     // Movie Completed
//   }
// );

// Frame properties:
// `fontOptions` - fillText style options
//   - use it in the first keyframe of text layers
//   - and in keyframes where the `symbol` property is given text
// `x` - mandatory in first keyframe
//   - optional in subsequent keyframes only if it never changes
// `y` - see `x`
// `rotation` - see `x`
// `remove` - layer will no longer render once keyframe time is exceeded
//   - use this only in a particular layer's final keyframe
// `symbol` - swap the given symbol for a different one
//   - only active until the keyframe is exceeded
//   - will be merged with the existing symbol,
//   - so only provide the parts of the symbol you want to overwrite
//   - can be text as well as cEl obj

const Movie = (x, y, width, height, timeline, callback)=> {
  // Determine movie duration.
  // Find max time among all layers in timeline.
  const duration = Math.max(...timeline.map(layer=>layer[1][layer[1].length-1][0]));

  // Convert plaintext into a cEl render object.
  const bootstrapText = (text, fontOptions)=> {
    const { width, height } = ctx.measureText(text);

    return {
      geometry: createRectangle([0 ,0], 0, width, height),

      render() {
        fillText(fontOptions, [0, 0], text);
      }
    };
  };

  // Collect symbols in movie.
  const symbols = timeline.map((layer)=> {
    let symbol = layer[0];

    // Only fontOptions is optionsal in movieObject.
    const { fontOptions={}, x, y, rotation } = layer[1][0][1];

    // Convert plaintext.
    if(typeof symbol === `string`) {
      symbol = bootstrapText(symbol, fontOptions);
    }

    // Setup symbol for its first render.
    symbol.geometry.position = [x, y];
    symbol.geometry.rotation = rotation;

    return symbol;
  });

  let callbackFired = false;

  const start = Date.now();

  return {
    geometry: createRectangle([x, y], 0, width, height),

    children: symbols.map((symbol, index)=> {
      if(timeline[index][1][0][0] !== 0) {
        return {};
      }

      return symbol;
    }).reverse(),

    render({ children }) {
      const now = Date.now();
      const diff = now - start;

      if(diff > duration) {
        if(callback && !callbackFired) {
          callback();
          callbackFired = true;
        }
        return;
      }

      for(const [index, layer] of timeline.entries()) {
        const keyframes = layer[1];

        let prevframe = {};

        for(const [keyframeIndex, [time, keyframe]] of keyframes.entries()) {
          // Save old keyframe and move on.
          if(diff > time) {
            if(keyframeIndex === 0) {
              children[children.length - 1 - index] = symbols[index];
            }

            if(keyframe.remove) {
              children[children.length - 1 - index] = {};
              break;
            } else {
              prevframe = { time, keyframe };
              continue;
            }
          } else if(keyframeIndex === 0) {
            break;
          }

          if(keyframeIndex === 0) {
            prevframe = { time, keyframe };
          }

          // Percentage of way through keyframe; 0-1.
          let progress = (diff-prevframe.time)/(time - prevframe.time);

          if(progress > 0.995) {
            progress = 1;
          }

          // Setup frame.
          // Extract values from previous keyframe.
          // If previous keyframe used function-driven values,
          // set them to their end states.
          for(const prop in prevframe.keyframe) {
            const val = prevframe.keyframe[prop];

            if(typeof val === `function`) {
              prevframe.keyframe[prop] = val(1);
            }
          }

          // Use keyframe symbol or main one.
          if(keyframe.symbol) {
            if(typeof keyframe.symbol === `string`) {
              keyframe.symbol = bootstrapText(keyframe.symbol, keyframe.fontOptions);
            }

            children[children.length - 1 - index] = keyframe.symbol;
          } else {
            children[children.length - 1 - index] = symbols[index];
          }

          const symbol =
            keyframe.symbol
              ? Object.assign({}, symbols[index], keyframe.symbol)
              : symbols[index];

          // Abbreviations.
          const { x:prevX, y:prevY, rotation:prevRot } = prevframe.keyframe;
          const { x:keyX, y:keyY, rotation:keyRot } = keyframe;
          const { geometry:geo } = symbol;
          const { position:geoPos } = geo;

          // Tween properties.
          if(typeof keyX === `function`) {
            geoPos[0] = keyX(progress, prevX, prevY, prevRot, width, height);
          } else if(keyX !== undefined) {
            geoPos[0] = prevX + (keyX - prevX)*progress;
          }
          if(typeof keyY === `function`) {
            geoPos[1] = keyY(progress, prevX, prevY, prevRot, width, height);
          } else if(keyY !== undefined) {
            geoPos[1] = prevY + (keyY - prevY)*progress;
          }
          if(typeof keyRot === `function`) {
            geo.rotation = keyRot(progress, prevX, prevY, prevRot, width, height);
          } else if(keyRot !== undefined) {
            geo.rotation = prevRot + (keyRot - prevRot)*progress;
          }

          // Do not look at future keyframes.
          break;
        }
      }
    }
  };
};

const characters = [avenger, protector, persecutor, child].map((character, index)=> [
  character,
  [
    [
      2000 + index*800,
      {
        x: viewWidth/4,
        y: viewHeight/2
      }
    ],
    [
      2000 + index*800 + 2000,
      {
        x: 0,
        y: 0
      }
    ],
    [
      2000 + index*800 + 2800,
      {
        x: 0,
        y: 0
      }
    ],
    [
      2000 + index*800 + 3800,
      {
        x: 0,
        y: -viewHeight
      }
    ]
  ]
]);

const ending$1 = [
  ...characters,
  [
    gem,
    [
      [
        6000 + characters.length*800,
        {
          x: viewWidth/4,
          y: viewHeight/2
        }
      ],
      [
        6000 + characters.length*800 + 2000,
        {
          x: 0,
          y: 0
        }
      ],
      [
        6000 + characters.length*800 + 2800,
        {
          x: 0,
          y: 0
        }
      ],
      [
        6000 + characters.length*800 + 3800,
        {
          x: 0,
          y: -viewHeight
        }
      ]
    ]
  ],
  [
    `~ fin    Rafe Lepre, Brian Blakely`,
    [
      [
        6000 + characters.length*800 + 4800,
        {
          fontOptions: {
            style: `#000`
          },
          x: -viewWidth/2 + 2,
          y: viewHeight/2 - 4
        }
      ],
      [
        6000 + characters.length*800 + 4900,
        {}
      ]
    ]
  ],
  [
    {
      geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

      render() {
        fillRectangle(
          `#fff`,
          [0, 0],
          viewWidth,
          viewHeight,
          0,
        );
      }
    },
    [
      [
        0,
        {
          x: 0,
          y: 0,
          rotation: 0
        }
      ]
    ]
  ]
];

// import Song from 'audio';
// import autumn from 'songs/autumn';
// const bgMusic = new Song(autumn);

var ending = {
  init: ()=> {
    // bgMusic.play(`repeat`);
    uiElements.push(Movie(0, 0, viewWidth, viewHeight, ending$1));
  },
  dismiss: ()=> {}
};

let graphics = [];

const groundPlanePoints = mapListSet(
  addListSet(getRectanglePoints(10000, 1600), [0, 1600 / 2]),
  perspective2d,
);

// Island Geometry
const islandPosition = average(islands.map(({ position }) => position));
const islandRadius = Math.max(...islands.map(({ position }) => magnitude(subtract(position, islandPosition)))) + 200;

// Characters.
const avngSprite = mkAvenger([...state.position], 0);
const protSprite = mkProtector(addSet([0, 10], state.position), 0);
const chldSprite = mkChild(addSet([-10, 0], state.position), 0);
const persSprite = mkPersecutor(addSet([10, 0], state.position), 0);
const gemSprite = mkGem(addSet([0, -10], state.position), 0);

graphics.push(avngSprite, protSprite, chldSprite, persSprite, gemSprite);

/*
  Miasma / Pool Creation
*/


const updateMiasma = (inc) => {
  state.miasma += 60 * inc;
  graphics = graphics.filter(([x, , , emoji]) => emoji !== tulip || x > state.miasma);
};

let triggerEnding = false;
let endingStart = 0;
const createPool =
  (maker, dialog, position) => maker(
    25,
    position,
    () => state.dialog.push(...dialog),
  );

const avengerAuthor = [avngSprite[3], `Avenger`];
const persecutorAuthor = [persSprite[3], `Persecutor`];
const protectorAuthor = [protSprite[3], `Protector`];
const childAuthor = [chldSprite[3], `Child`];
const originalAuthor = [gemSprite[3], `Origin`];

const pools = [];

const poolScript = [
  // LEVEL 1 - Adulthood.
  [makeAvengerPool, [
    [`I hate them, and everything they created.`, avengerAuthor],
    [`I'll take them with me if I can.`, avengerAuthor]
  ]],
  [makePersecutorPool, [
    [`It couldn't hurt to try, right? Once - only once.`, persecutorAuthor]
  ]],
  [makeChildPool, [
    [`I have a new coat, with stars!`, childAuthor],
    [`I'm going to do all my favorite things today.`, childAuthor]
  ]],
  [makeProtectorPool, [
    [`It takes so much effort at times, but we're worth all of it.`, protectorAuthor]
  ]],
  [makeEvilPool, [
    [`You take out groceries one-by-one, and stack them in the pantry.`, originalAuthor],
    [`At least three of your things were already in there.`, originalAuthor],
    () => { updateMiasma(4); Scene(createBattleScene(8, 0, 0, `resentment`)); },
  ]],
  // LEVEL 2 - Young Adulthood.
  [makeChildPool, [
    [`I made a lot of new friends.`, childAuthor],
  ]],
  [makeProtectorPool, [
    [`Two years and we're beginning to take a turn.`, protectorAuthor],
  ]],
  [makePersecutorPool, [
    [`Liars can never get close to me.  I'm a liar too.`, persecutorAuthor],
  ]],
  [makeEvilPool, [
    [`Some of your friends only know one of you.`, originalAuthor],
    () => { updateMiasma(3); Scene(createBattleScene(6, 6, 0, `doubt`)); },
  ]],

  // LEVEL 3 - Teenhood.
  [makePersecutorPool, [
    [`That little piss hung up on me.`, persecutorAuthor]
  ]],
  [makeChildPool, [
    [`He said he doesn't like me anymore.`, childAuthor],
    [`I was too hard to be around.`, childAuthor]
  ]],
  [makeEvilPool, [
    [`You went to his house for dinner.`, originalAuthor],
    [`Everyone was was confused when you arrived.`, originalAuthor],
    [`You were afraid.`, originalAuthor],
    () => { updateMiasma(2); Scene(createBattleScene(0, 8, 2, `deceit`)); },
  ]],

  // LEVEL 4 - Childhood.

  [makeChildPool, [
    [`I walked to school and back home every day.`, childAuthor],
    [`I stayed close behind the older kids.`, childAuthor],
    [`They threw cupcake and candy wrappers right on the sidewalk.`, childAuthor],
    [`I picked them up.`, childAuthor],
    [`The one watching wasn't someone I knew.`, childAuthor],
    [`I listened to his stories.`, childAuthor]
  ]],


  [makeEvilPool, [
    [`When he kissed you, it wasn't the same.`, originalAuthor],
    () => { updateMiasma(100); Scene(createBattleScene(6, 6, 3, `harm`)); },
  ]],

  [makeOriginalPool, [
    () => {
      graphics = [];
      pools.splice(0, pools.length - 1);
      endingStart = Date.now();
      triggerEnding = true;
    }
  ]]
];

{
  const length = poolScript.length + 4;
  let i = -1;
  while(++i < length) {
    const [maker, text] = poolScript.shift();
    pools.push(createPool(maker, text, [
      i * 60 - 550,
      700 + Math.random() * 300 | 0,
    ]));
    if(maker === makeEvilPool)++i;
  }
}

// Props.
const props = [
  [mkTree, 50],
  [mkTreeAlt, 50],
  [mkMountain, 10],
  [mkTulip, 500],
  [mkGrass, 300]
];

const generatePropPosition =
  () =>
    addSet(
      scaleSet(
        rotateSet([0, 1], Math.random() * 2 * Math.PI),
        islandRadius * Math.random()
      ),
      islandPosition
    );

const isOnIsland =
  (point) =>
    isPointInCircle(point, islandPosition, islandRadius) &&
    !!islands.find(({ collision }) => collision(point));

const isValidPropPosition =
  (point) =>
    isOnIsland(point) &&
    !pools.find(({ propCollision }) => propCollision(point));

const generateValidPropPoint =
  () => {
    let point = generatePropPosition();
    while(!isValidPropPosition(point)) point = generatePropPosition();
    return point;
  };

const len = Math.max(...props.map(([, count]) => count));
let i = -1;
while(++i < len) {
  for(const [prop, amount] of props) {
    if(i < amount) {
      graphics.push(prop(generateValidPropPoint(), 0));
    }
  }
}

// Colors
// ocean
const baseOcean = `#69D2E7`;
const seaFoam = `#fff`;

// sky
const skyBlue = `#90b4ec`;
updateMiasma(5);
const render$1 = () => {
  // Background
  fillRectangle(
    skyBlue,
    [0, 0],
    viewWidth * 2,
    viewHeight * 2,
    0,
  );

  fillPolygon(
    baseOcean,
    [0, 0],
    groundPlanePoints,
  );

  const waveScaleFactor = 1.2 - Math.abs(Date.now() % 7200 / (7200 / 2) - 1) / 10;

  islands.forEach(({ getShoreLine }) => strokeOval(
    { style: seaFoam, thickness: 4 },
    [0, 0],
    getShoreLine(waveScaleFactor),
  ));

  islands.forEach(({ getShoreLine }) => fillOval(
    `#fafac8`,
    [0, 0],
    getShoreLine(waveScaleFactor),
  ));

  islands.forEach(({ getBase }) => fillOval(
    `#00c864`,
    [0, 0],
    getBase(),
  ));

  // Ending segment within map.
  if(triggerEnding) {
    const diff = Date.now() - endingStart;

    if(diff > 3000) {
      Scene(ending);
      return;
    }

    pools.push(makeOriginalPool(25 + (diff / 3000) * (200 - 25), [350, 900]));
  }
  for(const pool$$1 of pools) {
    pool$$1.render();
    pool$$1.test(state.position);
  }

  // Dynamic
  graphics
    .map(point => [...perspective(point), point[2], point[3], point[4]])
    .sort((a, b) => b[2] - a[2])
    .forEach(([x, y, d, z, emoji, size]) => fillText(
      { font: `${(12 * size * (1 - 2 * (d - 10994) / 8248748)) | 0}px monospace` },
      [x, y - z],
      emoji
    ));

};

const charSpeed = () => inputs.space ? 6 : 3;

const follow =
  (sprite, distance$$1) => {
    const relativePos = subtract(state.position, sprite);
    if(magnitude(relativePos) > distance$$1) {
      addSet(sprite, scaleToSet(relativePos, charSpeed()));
    }
  };

const characterControls = keyboardVector(1);

var logic = () => {
  // Character Controls
  let movement;
  const speed = charSpeed();
  const vec = characterControls();
  if(magnitudeSqr(vec) > 0.5) state.target = null;
  if(state.target !== null) {
    const diff = subtract(state.target, state.position);
    if(magnitudeSqr(diff) < 3) state.target = null;
    movement = scaleToSet(diff, speed);
  } else {
    movement = scaleToSet(vec, speed);
  }

  const newPosition = add(state.position, movement);
  if(isOnIsland(newPosition) && newPosition[0] < state.miasma && !state.dialog.length) set(state.position, ...newPosition);

  set(avngSprite, ...state.position);
  follow(protSprite, 20 + Date.now() % 300 / 30);
  follow(chldSprite, 45 + Date.now() % 300 / 30);
  follow(persSprite, 70 + Date.now() % 300 / 30);
  follow(gemSprite, 90 + Date.now() % 300 / 30);
  const xDiff = state.position[0] - camera[0];
  if(Math.abs(xDiff) > viewWidth * 0.2) camera[0] += xDiff - sign(xDiff) * viewWidth * 0.2;
  set(camera, ...add(state.position, [0, -100]));
};

// import Song from 'audio';
// import overworldTheme from 'songs/overworld';
// const bgMusic = new Song(overworldTheme);

var overworld = {
  init: () => {
    // bgMusic.play(`repeat`);
    uiElements.push(Dialog);
    state.logic = (dt) => {
      // Logic
      logic(dt);
      render$1(dt);
      // Input
      if(inputs.click && !state.dialog.length) {
        state.target = calcWorldPosition(inputs.mousePosition);
      }
    };
  },
  dismiss: () => {
    // bgMusic.stop();
  },
};

// import Song from 'audio';
// import canond from 'songs/canond';
// import Movie from 'movie';
// import titleMovie, { endTitle } from 'movies/title';
// import intro from 'movies/intro';

// let skipped = false;
// inIntro = false;

const skipTitle = ()=> {
  // if(skipped) {
  // if(!inIntro) {
  // inIntro = true;

  // bgMusic.stop();
  // title.children = [Movie(0, 0, viewWidth, viewHeight, intro, ()=> {
  Scene(overworld);
  // })];
  // }

  // return;
  // }

  // skipped = true;

  // title.children.splice(0, title.children.length);
  // endTitle();
  // title.children.push(Movie(
  // 0, 0, viewWidth, viewHeight, titleMovie
  // ));
};

const bigText = {
  textBaseline: `middle`,
  style: white,
  font: title_text,
  horizontalAlign: true
};

const title = {
  geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

  // children: [Movie(
  //   0, 0, viewWidth, viewHeight, titleMovie, ()=> {
  //     skipped = true;
  //   }
  // )],

  render() {
    if(inputs.space === 1 || inputs.return === 1) {
      skipTitle();
    }

    fillRectangle(
      `#00f`,
      [0, 0],
      viewWidth,
      viewHeight,
      0,
    );

    fillText(bigText, [0,0], `A L T E R`);
    fillText(bigText, [0,-24], gem);
    fillText({ style: white, font: base_text }, [-28,51], `new game`);
    (Date.now() % 600 > 400) && fillPolygon(`white`, [-42, 48], [-5, 3, 5, 0, -5, -3]);
  },
  interact: {
    onMouseDown: skipTitle
  }
};

// const bgMusic = new Song(canond);

var titlescreen = {
  init: () => {
    uiElements.push(title);
    // bgMusic.play();
    state.logic = null;
  },
  dismiss: () => {}//bgMusic.stop(),
};

let dt = 0;
let t = 0;

var loop = func => {
  let running = true;
  requestAnimationFrame(function main() {
    dt = Math.min(16, Date.now() - t);
    running && func(dt);
    t = Date.now();
    requestAnimationFrame(main);
  });
  return () => running = !running;
};

const Shader = () => {
  const img = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const data = img.data;
  let i = -1;
  while(++i < data.length) data[i] = ((data[i] / 75) | 0) * 75;
  ctx.putImageData(img, 0, 0);
};

Scene(titlescreen);

loop((dt) => {
  clear$1();
  state.logic && state.logic();
  render(dt);
  updateInputs();
  Shader();
});

}());
