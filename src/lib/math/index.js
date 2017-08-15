export { sum, noise, gridNoise } from './noise.js';
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
