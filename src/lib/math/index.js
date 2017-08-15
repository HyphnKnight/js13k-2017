import { times, concat, reduce, countBy, heuristicFind, mgSort } from '../array';
export { sum, noise, gridNoise } from './noise';
export const clamp = (num, lower, upper) => num > upper
    ? upper
    : (num < lower
        ? lower
        : num);
export const inRange = (num, lower = 0, upper = 1) => !(num < lower || num > upper);
export const sign = (num) => num > 0
    ? 1
    : (num < 0
        ? -1
        : 0);
export const clampPerc = (num, lower, upper) => (num - lower) / (upper - lower);
export const random = (max = 1, min = 0) => Math.random() * (max - min) + min;
export const lerp = (a, b, dt) => a + (b - a) * dt;
export const sqr = (x) => x * x;
export function round(num, places = 8) {
    const base = Math.pow(10, places);
    return Math.round(num * base) / base;
}
export function smoothStep(low, high, x) {
    x = clamp((x - low) / (high - low), 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
}
export const mean = (array, func) => reduce(array, (sum, val) => sum + func(val), 0) / array.length;
export const mode = (array, func) => {
    const count = countBy(array, func);
    return heuristicFind(Object.keys(count), key => count[key]);
};
export const median = (array, func) => {
    const sortedArray = mgSort(array, func);
    const middle = array.length / 2;
    return middle % 1 === 0
        ? sortedArray[middle]
        : (func(sortedArray[Math.floor(middle)]) + func(sortedArray[Math.ceil(middle)])) / 2;
};
export const randomize = (options) => {
    const hat = reduce(Object.keys(options), (hat, name) => concat(hat, times(options[name], () => name)), []);
    return hat[Math.floor(Math.random() * hat.length)];
};
//# sourceMappingURL=index.js.map