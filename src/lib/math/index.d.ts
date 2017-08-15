export { sum, noise, gridNoise } from './noise';
export declare const clamp: (num: number, lower: number, upper: number) => number;
export declare const inRange: (num: number, lower?: number, upper?: number) => boolean;
export declare const sign: (num: number) => number;
export declare const clampPerc: (num: number, lower: number, upper: number) => number;
export declare const random: (max?: number, min?: number) => number;
export declare const lerp: (a: number, b: number, dt: number) => number;
export declare const sqr: (x: number) => number;
export declare function round(num: number, places?: number): number;
export declare function smoothStep(low: number, high: number, x: number): number;
export declare const mean: <type>(array: type[], func: (val: type) => number) => number;
export declare const mode: <type>(array: type[], func: (val: type) => number) => string;
export declare const median: <type>(array: type[], func: (val: type) => number) => number | type;
export declare const randomize: (options: {
    [name: string]: number;
}) => string;
