import { uniqueId } from '../string';
import { round, } from '../math';
import { isVector2d, subtractList, } from '../vector/tuple';
import { isNumber } from '../is';
const originVector = [0, 0];
const translate = (ctx) => (vec) => ctx.translate(round(vec[0], 0), round(vec[1], 0));
const rotate = (ctx) => (angle) => ctx.rotate(angle);
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
    rotate(ctx)(angle);
    moveTo(ctx)(originVector);
    for (let i = 0; i < adjustedPoints.length; i += 2) {
        lineTo(ctx)([adjustedPoints[i], adjustedPoints[i + 1]]);
    }
    ctx.restore();
};
const drawPolygon = (ctx) => (position, points, angle = 0) => {
    const first = [
        points[points.length - 2],
        points[points.length - 1]
    ];
    ctx.save();
    translate(ctx)(position);
    rotate(ctx)(angle);
    moveTo(ctx)(first);
    for (let i = 0; i < points.length; i += 2) {
        lineTo(ctx)([points[i], points[i + 1]]);
    }
    ctx.restore();
};
const drawRectangle = (ctx) => (position, width, height, angle = 0) => {
    ctx.save();
    translate(ctx)(position);
    rotate(ctx)(angle);
    rect(ctx)([-width / 2, -height / 2], round(width, 0), round(height, 0));
    ctx.restore();
};
const drawArc = (ctx) => (vec, angle, radius = 100, startAngle = 0, endAngle = 2 * Math.PI, counterClockwise = false) => {
    ctx.save();
    translate(ctx)(vec);
    rotate(ctx)(angle);
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
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    ctx.strokeText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
    ctx.restore();
};
const fillText = (ctx) => (fontOptions, vec, text) => {
    ctx.save();
    ctx.font = fontOptions.font || ctx.font;
    ctx.textAlign = fontOptions.textAlign || ctx.textAlign;
    ctx.textBaseline = fontOptions.textBaseline || ctx.textBaseline;
    ctx.fillText(text, round(vec[0], 0), round(vec[1], 0), fontOptions.maxWidth);
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
            if (isVector2d(pos)) {
                this.position[0] = pos[0];
                this.position[1] = pos[1];
            }
            const rot = this.saved_rotations.pop();
            if (isNumber(rot)) {
                this.rotation = rot;
            }
        }
    }
}
//# sourceMappingURL=tuple.js.map