/*
    Nestable UI elements that instead of being dom nodes are instead
    are rendered to a canvas element.
 */
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';
import { createRectangle, } from 'lib/geometry';
import { createPalette, Transform } from 'lib/canvas';
import { rotateListAround, addListSet, rotate as rotateVec, addSet, subtractSet } from 'lib/vector';
import { isPointInCircle, isPointInAlignedRectangle, isPointInPolygon, isCircleInAlignedRectangle, isAlignedRectangleInAlignedRectangle, isPolygonInPolygon, } from 'lib/intersection';
export const onMouseDownCollection = new Map();
export const onMouseMoveCollection = new Map();
export const onMouseUpCollection = new Map();
export const windowGeometry = createRectangle([0, 0], 0, window.innerWidth, window.innerHeight, `window`);
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
  const { ctx, translate, rotate } = palette;
  ctx.save();
  transform.save();
  if(geometry) {
    translate(geometry.position);
    addSet(transform.position, rotateVec(geometry.position, transform.rotation));
    rotate(geometry.rotation);
    transform.rotation += geometry.rotation;
  }
  ctx.save();
  render && (!geometry || isInWindow(transform.apply(geometry))) && render(palette, el);
  ctx.restore();
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
  ctx.restore();
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
export const renderUI = (canvas, base) => {
  const palette = createPalette(canvas.getContext(`2d`));
  palette.clear();
  canvas.addEventListener(
    isTouch ? `ontouchstart` : `mousedown`,
    interactionHandler(onMouseDownCollection),
  );
  canvas.addEventListener(
    isTouch ? `ontouchmove` : `mousemove`,
    interactionHandler(onMouseMoveCollection),
  );
  canvas.addEventListener(
    isTouch ? `ontouchend` : `mouseup`,
    interactionHandler(onMouseUpCollection),
  );
  return {
    palette,
    render: () => renderCEl(new Transform(), palette)(base),
  };
};
