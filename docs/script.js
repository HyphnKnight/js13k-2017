(function () {
'use strict';

const sum$1 = (...numbers) => {
    let num = 0;
    for (let i = numbers.length - 1; i >= 0; --i) {
        num += numbers[i];
    }
    return num;
};
const noise = (list, getNeighbors, getValue, setValue, iterations = 1) => {
    for (let i = list.length - 1; i >= 0; --i) {
        const neighbors = getNeighbors(list[i]);
        const neighborValue = sum$1(...neighbors.map(getValue)) / neighbors.length;
        const newValue = neighborValue + getValue(list[i]) / 2;
        setValue(list[i], newValue);
    }
    if (!!iterations)
        noise(list, getNeighbors, getValue, setValue, iterations - 1);
    return list;
};
function getGridNeighbors(grid, x, y, radius = 1) {
    const results = [];
    for (let yOffset = radius * -1; yOffset < radius + 1; ++yOffset) {
        for (let xOffset = radius * -1; xOffset < radius + 1; ++xOffset) {
            const newY = y + yOffset;
            const newX = x + xOffset;
            if (!!grid[newY] && !!grid[newY][newX] && (!!yOffset || !!xOffset)) {
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






const magnitudeSqr = (vec) => sqr(vec[0]) + sqr(vec[1]);









function rotate(vec, rotation) {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    return [
        round(vec[0] * c - vec[1] * s),
        round(vec[0] * s + vec[1] * c)
    ];
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

const uniqueId = () => Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);

function find(array, func) {
    let i = -1;
    while (++i < array.length) {
        if (func(array[i], i, array))
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


const createRectangle = (position, rotation = 0, width = 1, height = 1, label = '') => ({
    id: uniqueId(),
    shape: 'Rectangle',
    label,
    position, rotation,
    width, height,
    points: getRectanglePoints(width, height),
});

/* Custom Geometry */


/* Utility Funcs */

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
    for (let i = 0; i < adjustedPoints.length; i += 2) {
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
    for (let i = 0; i < points.length; i += 2) {
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
    arc(ctx)(originVector, radius, startAngle, endAngle, counterClockwise);
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
const fillPolygon = fill(drawPolygon);
const fillRectangle = fill(drawRectangle);
const fillLine = fill(drawLine);
const fillArc = fill(drawArc);
const strokePolygon = stroke(drawPolygon);
const strokeRectangle = stroke(drawRectangle);
const strokeLine = stroke(drawLine);
const strokeArc = stroke(drawArc);
const strokeText = (ctx) => (fontOptions, vec, text) => {
    ctx.save();
    ctx.strokeStyle = fontOptions.style || '';
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    ctx.strokeText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
    ctx.restore();
};
const fillText = (ctx) => (fontOptions, vec, text) => {
    ctx.save();
    ctx.fillStyle = fontOptions.style || '';
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
    fillPolygon: fillPolygon(ctx),
    fillLine: fillLine(ctx),
    fillArc: fillArc(ctx),
    fillText: fillText(ctx),
    strokePolygon: strokePolygon(ctx),
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
        if (this.saved_positions.length > 0) {
            const pos = this.saved_positions.pop();
            if (!!pos) {
                this.position[0] = pos[0];
                this.position[1] = pos[1];
            }
            const rot = this.saved_rotations.pop();
            if (!!rot || rot === 0) {
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
    for (let i = 0; i < length; i += 2) {
        const next = i === length - 1 ? 0 : i + 1; //points[i], points[]
        if (pointRelationToLine(point, [points[i], points[i + 1], points[next], points[next + 1]]) === -1)
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
const renderCEl = (transform, palette) => (el) => {
    const { geometry, children, render, interact } = el;
    const { ctx, translate, rotate: rotate$$1 } = palette;
    ctx.save();
    transform.save();
    if (!!geometry) {
        translate(geometry.position);
        addSet(transform.position, rotate(geometry.position, transform.rotation));
        rotate$$1(geometry.rotation);
        transform.rotation += geometry.rotation;
    }
    ctx.save();
    render && (!geometry || isInWindow(transform.apply(geometry))) && render(palette, el);
    ctx.restore();
    children && children.forEach(renderCEl(transform, palette));
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
const convertEventsToPosition = (evt) => {
    if (!!evt.clientX) {
        return [evt.clientX, evt.clientY];
    } else {
        const touch = evt.touches[0];
        return [touch.clientX, touch.clientY];
    }
};
const isInside = (point) => (geometry) => {
    switch (geometry.shape) {
        case 'Circle': return isPointInCircle(point, geometry.position, geometry.radius);
        case 'Rectangle': return isPointInAlignedRectangle(point, geometry.position, geometry.width, geometry.height);
        case 'Polygon': return isPointInPolygon(point, addListSet(rotateListAround(geometry.points, [0, 0], geometry.rotation), geometry.position));
        default: return false;
    }
};
const interactionHandler =
    (collection) =>
        (evt) => {
            if (!!collection.size) {
                const position = convertEventsToPosition(evt);
                const isPositionInside = isInside(position);
                [...collection.values()]
                    .filter(([_cEl, geometry]) => !geometry || isPositionInside(geometry))
                    .forEach(([cEl, _geo, effect]) => effect(cEl, position));
            }
        };
const renderUI = (canvas, base) => {
    const palette = createPalette(canvas.getContext('2d'));
    palette.clear();
    canvas.addEventListener(
        isTouch ? 'ontouchstart' : 'mousedown',
        interactionHandler(onMouseDownCollection),
    );
    canvas.addEventListener(
        isTouch ? 'ontouchmove' : 'mousemove',
        interactionHandler(onMouseMoveCollection),
    );
    canvas.addEventListener(
        isTouch ? 'ontouchend' : 'mouseup',
        interactionHandler(onMouseUpCollection),
    );
    return {
        palette,
        render: () => renderCEl(new Transform(), palette)(base),
    };
};

// colors

const white = '#fff';

// fonts
// const mono = 'Lucida Console, Monaco5, monospace';
const arial = 'Arial Black, Gadget, sans-serif';
const helvetica = 'Helvetica, sans-serif';

// text style
const title_text = '24px ' + arial;

const base_text = '12px ' + helvetica;

const keyCodes = {

  '38': 'up',
  '40': 'down',
  '37': 'left',
  '39': 'right',

  '81': 'q',
  '87': 'w',
  '69': 'e',
  '65': 'a',
  '83': 's',
  '68': 'd',

  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',

  '189': '-',
  '187': '=',

  '32': 'space',
  '13': 'return',
  '16': 'shift',
  '17': 'ctrl',
  '9': 'tab',
  '18': 'alt'

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
    if (!!key) inputs[key] = active;
    return inputs[key];
  };

document.body.onkeyup = ({ keyCode }) => parseKeyInfo(keyCode, false);
document.body.onkeydown = ({ keyCode }) => parseKeyInfo(keyCode, true);

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
      textBaseline: 'middle',
      font: base_text,
      style: white,
    }, [-width / 2, 0], text);
  },
  interact: {
    onMouseMove: () => selected_index = index,
    onMouseDown: () => selected_index = index,
  }
});

const Menu = {
  geometry: createRectangle([320 / 2, 120], 0, 140, 40),
  children: [
    createOption(0, 'new game', [0, 48]),
    createOption(1, 'continue game', [0, 72]),
  ],
  render: (palette, el) => {
    const { fillText, fillPolygon } = palette;
    fillText({
      textBaseline: 'middle',
      style: white,
      font: title_text,
    }, [-65, -8], 'A L T E R');
    (Date.now() % 600 > 400) && fillPolygon(
      'white',
      selected_index === 0
        ? [-42, 48]
        : [-60, 72],
      [-5, 3, 5, 0, -5, -3]
    );
    (inputs.up || inputs.w) && (selected_index = 0);
    (inputs.down || inputs.s) && (selected_index = 1);
  },
};

let cursor_position = [0, 0];

const Cursor = {
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

const canvas = document.querySelector('canvas');
canvas.width = 320;
canvas.height = 240;

const { palette, render } = renderUI(canvas, {
  geometry: createRectangle([0, 0], 0, window.innerWidth, window.innerHeight),
  children: [Menu, Cursor],
});

palette.ctx.imageSmoothingEnabled = false;

let dt = 0;
let t = 0;
requestAnimationFrame(function main() {
  dt = Math.min(16, Date.now() - t);
  // console.log(dt);

  // Compute Logic

  // Render Graphics
  palette.clear();
  render();

  t = Date.now();
  requestAnimationFrame(main);
});

}());
