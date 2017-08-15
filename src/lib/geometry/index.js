import { rotate, scaleSet, subtractListSet, averageList, rotateList, addListSet } from '../vector/index';
import { uniqueId } from '../string/index';
import { times, flatten } from '../array/index';
/* Utilities */
export const getRectanglePoints = (width, height) => ([
    -width / 2, +height / 2,
    -width / 2, -height / 2,
    +width / 2, -height / 2,
    +width / 2, +height / 2,
]);
export const normalizePoints = (points) => subtractListSet(points, averageList(points));
export const createLinesFromPoints = (points) => {
    const results = [];
    const length = points.length;
    for (let i = 0; i < length; i += 2) {
        const next = i === length - 1 ? 0 : i + 1;
        results.push([
            points[i], points[i + 1],
            points[next] - points[i], points[next + 1] - points[i + 1]
        ]);
    }
    return results;
};
/* Basic Geometry */
export const createPoint = (position, rotation = 0, label = '') => ({
    id: uniqueId(),
    shape: 'Point',
    label,
    position, rotation,
});
export const createCircle = (position, rotation = 0, radius = 1, label = '') => ({
    id: uniqueId(),
    shape: 'Circle',
    label,
    position, rotation,
    radius,
});
export const createRectangle = (position, rotation = 0, width = 1, height = 1, label = '') => ({
    id: uniqueId(),
    shape: 'Rectangle',
    label,
    position, rotation,
    width, height,
    points: getRectanglePoints(width, height),
});
export const createPolygon = (position, rotation = 0, points, label = '') => ({
    id: uniqueId(),
    shape: 'Polygon',
    label,
    position, rotation,
    points: normalizePoints(points),
});
/* Custom Geometry */
export const createSquare = (position, rotation, size, label) => createRectangle(position, rotation, size, size, label);
const createEqualLateralPolygonPoints = (sides, radius) => flatten(times(sides, i => scaleSet(rotate([0, 1], i * (Math.PI / sides)), radius)));
export const createEqualLateralPolygon = (position, rotation, sides, radius, label) => createPolygon(position, rotation, createEqualLateralPolygonPoints(sides, radius), label);
/* Utility Funcs */
export const getPolygonPoints = (polygon) => addListSet(rotateList(polygon.points, polygon.rotation), polygon.position);
//# sourceMappingURL=tuple.js.map
