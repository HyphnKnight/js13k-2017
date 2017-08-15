/*
    Nestable UI elements that instead of being dom nodes are instead
    are rendered to a canvas element.
 */
import { createRectangle, } from '../geometry/tuple';
import { createPalette, Transform } from '../canvas/tuple';
import { forEach, filter } from '../array';
import { rotateListAround, addListSet, rotate as rotateVec, addSet, } from '../vector/tuple';
import { is } from '../is';
import { isPointInCircle, isPointInAlignedRectangle, isPointInPolygon, isCircleInAlignedRectangle, isAlignedRectangleInAlignedRectangle, isPolygonInPolygon, } from '../intersection/tuple';
export const onMouseDownCollection = new Map();
export const onMouseMoveCollection = new Map();
export const onMouseUpCollection = new Map();
export let windowGeometry = createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, 'window');
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
    const { ctx, translate, rotate } = palette;
    ctx.save();
    transform.save();
    if (!!geometry) {
        translate(geometry.position);
        addSet(transform.position, rotateVec(geometry.position, transform.rotation));
        rotate(geometry.rotation);
        transform.rotation += geometry.rotation;
    }
    ctx.save();
    render && (!geometry || isInWindow(transform.apply(geometry))) && render(palette, el);
    ctx.restore();
    children && forEach(children, renderCEl(transform, palette));
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
    if (is(evt => !!evt.clientX)(evt)) {
        return [evt.clientX, evt.clientY];
    }
    else {
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
const interactionHandler = (collection) => (evt) => {
    if (!!collection.size) {
        const position = convertEventsToPosition(evt);
        const isPositionInside = isInside(position);
        forEach(filter([...collection.values()], ([_cEl, geometry]) => isPositionInside(geometry)), ([cEl, _geo, effect]) => effect(cEl, position));
    }
};
export const renderUI = (canvas, base) => {
    if (is(x => !!x)(canvas)) {
        const context = canvas.getContext('2d');
        if (is(x => !!x)(context)) {
            const palette = createPalette(context);
            palette.clear();
            canvas.addEventListener(isTouch
                ? 'ontouchstart'
                : 'mousedown', interactionHandler(onMouseDownCollection));
            canvas.addEventListener(isTouch
                ? 'ontouchmove'
                : 'mousedown', interactionHandler(onMouseMoveCollection));
            canvas.addEventListener(isTouch
                ? 'ontouchend'
                : 'mousedown', interactionHandler(onMouseUpCollection));
            return {
                palette,
                render: () => renderCEl(new Transform(), palette)(base),
            };
        }
    }
};
//# sourceMappingURL=index.js.map