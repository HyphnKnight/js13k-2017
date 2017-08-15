import { lerp as nLerp, round, sign, sqr } from '../math/index.js';
export const add = (vecA, vecB) => ([
    vecA[0] + vecB[0],
    vecA[1] + vecB[1]
]);
export const addSet = (base, mod) => {
    base[0] += mod[0];
    base[1] += mod[1];
    return base;
};
export const subtract = (vecA, vecB) => ([
    vecA[0] - vecB[0],
    vecA[1] - vecB[1]
]);
export const subtractSet = (base, mod) => {
    base[0] -= mod[0];
    base[1] -= mod[1];
    return base;
};
export const scale = (vec, scale) => ([
    vec[0] * scale,
    vec[1] * scale
]);
export const scaleSet = (base, scale) => {
    base[0] *= scale;
    base[1] *= scale;
    return base;
};
export const lerp = (vecA, vecB, dt) => ([
    nLerp(vecA[0], vecB[0], dt),
    nLerp(vecA[1], vecB[1], dt)
]);
export const lerpSet = (vecA, vecB, dt) => {
    vecA[0] = nLerp(vecA[0], vecB[0], dt);
    vecA[1] = nLerp(vecA[1], vecB[1], dt);
    return vecA;
};
export const equals = (vecA, vecB) => vecA[0] === vecB[0] &&
    vecA[1] === vecB[1];
export const magnitudeSqr = (vec) => sqr(vec[0]) + sqr(vec[1]);
export const magnitude = (vec) => Math.sqrt(magnitudeSqr(vec));
export const normalize = (vec) => vec[0] === 0 && vec[1] === 0
    ? [0, 0]
    : scale(vec, 1 / magnitude(vec));
export const normalizeSet = (vec) => vec[0] === 0 && vec[1] === 0
    ? [0, 0]
    : scaleSet(vec, 1 / magnitude(vec));
export const normal = (vec) => ([
    -vec[1],
    vec[0]
]);
export const normalSet = (vec) => {
    const tmp = vec[0];
    vec[0] = -vec[1];
    vec[1] = tmp;
    return vec;
};
export const invert = (vec) => scale(vec, -1);
export const invertSet = (vec) => scaleSet(vec, -1);
export const dot = (vecA, vecB) => vecA[0] * vecB[0] + vecA[1] * vecB[1];
export const cross = (vecA, vecB) => vecA[0] * vecB[1] - vecA[1] * vecB[0];
export function rotate(vec, rotation) {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    return [
        round(vec[0] * c - vec[1] * s),
        round(vec[0] * s + vec[1] * c)
    ];
}
export function rotateSet(vec, rotation) {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    const tmp = vec[0];
    vec[0] = round(vec[0] * c - vec[1] * s);
    vec[1] = round(tmp * s + vec[1] * c);
    return vec;
}
export const scaleTo = (vec, newMagnitude) => scaleSet(normalize(vec), newMagnitude);
export const scaleToSet = (vec, newMagnitude) => scaleSet(normalizeSet(vec), newMagnitude);
export const component = (vec, directionVector) => magnitude(vec) * Math.cos(Math.atan2(vec[1], vec[0]) - Math.atan2(directionVector[1], directionVector[0]));
export const componentVector = (vec, directionVector) => scaleSet(normal(directionVector), component(vec, directionVector));
export const sum = (vecs) => {
    const result = [0, 0];
    for (let i = vecs.length - 1; i >= 0; --i) {
        addSet(result, vecs[i]);
    }
    return result;
};
export const average = (vecs) => scaleSet(sum(vecs), 1 / vecs.length);
export function set(vec, x, y) {
    vec[0] = x;
    vec[1] = y;
    return vec;
}
export const absolute = (vec) => set(vec, vec[0] * sign(vec[0]), vec[1] * sign(vec[1]));
export const copy = (vec) => ([vec[0], vec[1]]);
const tempVectors = [];
const longTermStorage = [];
let tempIndex = 0;
let tempStorageSizes = [];
let maxValue = 0;
export const tempVector = (x = 0, y = 0) => set(tempVectors[++tempIndex] || (tempVectors[tempIndex] = [0, 0]), x, y);
export const fetchVector = (x = 0, y = 0) => {
    let vec = longTermStorage.shift();
    if (!vec)
        vec = [0, 0];
    return set(vec, x, y);
};
export const releaseVector = (vec) => {
    longTermStorage.push(vec);
};
export function resetTempVectors() {
    tempStorageSizes.push(maxValue);
    while (tempStorageSizes.length > 10)
        tempStorageSizes.shift();
    maxValue = 0;
    const tempLimit = Math.max(...tempStorageSizes);
    while (tempVectors.length > tempLimit && tempVectors.length > tempIndex)
        tempVectors.pop();
}
export const VMD = (func) => (...args) => {
    const index = tempIndex;
    const result = func(...args);
    maxValue = Math.max(maxValue, tempIndex = index);
    return result;
};
export const distance = VMD((vecA, vecB) => magnitude(subtract(vecA, vecB)));
export const addList = (list, mod) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] + mod[0];
        result[i + 1] = list[i + 1] + mod[1];
    }
    return result;
};
export const addListSet = (list, mod) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] += mod[0];
        list[i + 1] += mod[1];
    }
    return list;
};
export const subtractList = (list, mod) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] - mod[0];
        result[i + 1] = list[i + 1] - mod[1];
    }
    return result;
};
export const subtractListSet = (list, mod) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] -= mod[0];
        list[i + 1] -= mod[1];
    }
    return list;
};
export const scaleList = (list, scale) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = list[i] * scale;
        result[i + 1] = list[i + 1] * scale;
    }
    return result;
};
export const scaleListSet = (list, scale) => {
    for (let i = 0, len = list.length; i < len; i += 2) {
        list[i] *= scale;
        list[i + 1] *= scale;
    }
    return list;
};
export const invertList = (list) => scaleList(list, -1);
export const invertListSet = (list) => scaleListSet(list, -1);
export const normalList = (list) => {
    const result = [];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = -list[i + 1];
        result[i + 1] = list[i];
    }
    return result;
};
export const normalListSet = (list) => {
    let tmp = 0;
    for (let i = 0, len = list.length; i < len; i += 2) {
        tmp = list[i];
        list[i] = -list[i + 1];
        list[i + 1] = list[i];
    }
    return list;
};
export const rotateList = (list, rotation) => {
    const result = [];
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[i] = round(list[i] * c - list[i + 1] * s);
        result[i + 1] = round(list[i] * s + list[i + 1] * c);
    }
    return result;
};
export const rotateListSet = (list, rotation) => {
    const s = Math.sin(rotation);
    const c = Math.cos(rotation);
    let tmp = 0;
    for (let i = 0, len = list.length; i < len; i += 2) {
        tmp = list[i];
        list[i] = round(tmp * c - list[i + 1] * s);
        list[i + 1] = round(tmp * s + list[i + 1] * c);
    }
    return list;
};
export const rotateListAround = (list, point, rotation) => addList(rotateList(subtractList(list, point), rotation), point);
export const rotateListAroundSet = (list, point, rotation) => addListSet(rotateListSet(subtractListSet(list, point), rotation), point);
export const scaleToList = (list, newMagnitude) => scaleList(normalList(list), newMagnitude);
export const scaleToListSet = (list, newMagnitude) => scaleListSet(normalListSet(list), newMagnitude);
export const sumList = (list) => {
    const result = [0, 0];
    for (let i = 0, len = list.length; i < len; i += 2) {
        result[0] += list[i];
        result[1] += list[i + 1];
    }
    return result;
};
export const averageList = (list) => {
    const result = [0, 0];
    const length = Math.floor(list.length / 2);
    for (let i = 0; i < length; i += 2) {
        result[0] += list[i];
        result[1] += list[i + 1];
    }
    result[0] /= length;
    result[1] /= length;
    return result;
};
export const listToVector = (list) => {
    const result = [];
    for (let i = 0; i < length; i += 2) {
        result.push([list[i], list[i + 1]]);
    }
    return result;
};
//# sourceMappingURL=tuple.js.map
