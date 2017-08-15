import { forEach, map, copy } from '../array';
import { uniqueId } from '../string';
import { round, } from '../math';
import Vector, { subtract, isVector } from '../vector';
import { isNumber } from '../is';
const translate = (ctx) => (vec) => ctx.translate(round(vec.x, 0), round(vec.y, 0));
const rotate = (ctx) => (angle) => ctx.rotate(angle);
const clearRect = (ctx) => (vec, width, height) => ctx.clearRect(round(vec.x, 0), round(vec.y, 0), round(width, 0), round(height, 0));
const clear = (ctx, canvas) => () => clearRect(ctx)({ x: 0, y: 0 }, canvas.width, canvas.height);
const moveTo = (ctx) => (vec) => ctx.moveTo(round(vec.x, 0), round(vec.y, 0));
const lineTo = (ctx) => (vec) => ctx.lineTo(round(vec.x, 0), round(vec.y, 0));
const quadraticCurveTo = (ctx) => (vec, control) => ctx.quadraticCurveTo(round(control.x, 0), round(control.y, 0), round(vec.x, 0), round(vec.y, 0));
const arc = (ctx) => (vec, radius, startAngle, endAngle, counterClockwise) => ctx.arc(round(vec.x, 0), round(vec.y, 0), radius, startAngle, endAngle, counterClockwise);
const rect = (ctx) => (vec, width, height) => ctx.rect(round(vec.x, 0), round(vec.y, 0), round(width, 0), round(height, 0));
const drawImage = (ctx) => (image) => (vec, width, height) => ctx.drawImage(image, round(vec.x, 0), round(vec.y, 0), width, height);
const drawSlicedImage = (ctx) => (image) => (vec, slice, sliceWidth, sliceHeight, width, height) => ctx.drawImage(image, round(slice.x, 0), round(slice.y, 0), sliceWidth, sliceHeight, round(vec.x, 0), round(vec.y, 0), width, height);
const drawLine = (ctx) => (points, angle = 0) => {
    const origin = copy(points)[0];
    points.shift();
    const adjustedPoints = map(points, (point) => subtract(point, origin));
    ctx.save();
    translate(ctx)(origin);
    rotate(ctx)(angle);
    moveTo(ctx)({ x: 0, y: 0 });
    forEach(adjustedPoints, lineTo(ctx));
    ctx.restore();
};
const drawPolygon = (ctx) => (position, points, angle = 0) => {
    const first = points[points.length - 1];
    ctx.save();
    translate(ctx)(position);
    rotate(ctx)(angle);
    moveTo(ctx)(first);
    forEach(points, lineTo(ctx));
    ctx.restore();
};
const drawRectangle = (ctx) => (position, width, height, angle = 0) => {
    ctx.save();
    translate(ctx)(position);
    rotate(ctx)(angle);
    rect(ctx)({ x: 0, y: 0 }, round(width, 0), round(height, 0));
    ctx.restore();
};
const drawArc = (ctx) => (vec, angle, radius = 100, startAngle = 0, endAngle = 2 * Math.PI, counterClockwise = false) => {
    ctx.save();
    translate(ctx)(vec);
    rotate(ctx)(angle);
    arc(ctx)({ x: 0, y: 0 }, radius, startAngle, endAngle, counterClockwise);
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
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    ctx.strokeText(text, round(vec.x, 0), round(vec.y, 0), fontOptions.maxWidth);
    ctx.restore();
};
const fillText = (ctx) => (fontOptions, vec, text) => {
    ctx.save();
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    ctx.fillText(text, round(vec.x, 0), round(vec.y, 0), fontOptions.maxWidth);
    ctx.restore();
};
export const createPalette = (ctx) => ({
    ctx,
    canvas: ctx.canvas,
    translate: translate(ctx),
    rotate: rotate(ctx),
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
export class Transform {
    constructor() {
        this.position = new Vector();
        this.rotation = 0;
        this.saved_positions = [];
        this.saved_rotations = [];
    }
    apply(geometry) {
        const position = this.position.copy();
        const rotation = this.rotation;
        return Object.assign(Object.create(null), geometry, { id: uniqueId(), position, rotation });
    }
    save() {
        this.saved_positions.push(new Vector(this.position.x, this.position.y));
        this.saved_rotations.push(this.rotation);
    }
    restore() {
        if (this.saved_positions.length > 0) {
            const pos = this.saved_positions.pop();
            if (isVector(pos)) {
                this.position.x = pos.x;
                this.position.y = pos.y;
            }
            const rot = this.saved_rotations.pop();
            if (isNumber(rot)) {
                this.rotation = rot;
            }
        }
    }
}
//# sourceMappingURL=index.js.map