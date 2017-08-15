export interface iterator<T, V> {
    (value: T, index: number, array: T[]): V;
}
export interface reduceIterator<T, R> {
    (base: R, value: T, index: number, array: T[]): R;
}
export interface timesIterator<T> {
    (index: number, length: number): T;
}
export declare function forEach<T>(array: T[], func: iterator<T, void>): T[];
export declare function reduce<T, R>(array: T[], func: reduceIterator<T, R>, base: R): R;
export declare function reduceRight<T, R>(array: T[], func: reduceIterator<T, R>, base: R): R;
export declare const map: <T, R>(array: T[], func: iterator<T, R>) => R[];
export declare const mapToObject: <T>(array: T[], func: iterator<T, string>) => {
    [name: string]: T;
};
export declare const mapToMap: <src, key, value>(array: src[], func: iterator<src, [key, value]>) => Map<key, value>;
export declare const filter: <T>(array: T[], func?: iterator<T, boolean>) => T[];
export declare function find<T>(array: T[], func: iterator<T, boolean>): T | null;
export declare function times<T>(length: number, func: timesIterator<T>): T[];
export declare const difference: <T>(array: T[], targetArray: T[]) => T[];
export declare const intersection: <T>(array: T[], targetArray: T[]) => T[];
export declare const flatten: <T>(array: T[][]) => T[];
export declare const unique: <T>(array: T[]) => T[];
export declare function uniqueBy<T>(array: T[], func: iterator<T, number | boolean | string | symbol | Function>): T[];
export declare const countBy: <T>(array: T[], func: iterator<T, string | number>) => {
    [key: string]: number;
};
export declare const has: <type>(array: type[], value: type) => boolean;
export declare const invoke: (array: Function[]) => Function[];
export declare const concat: <T>(...arrays: T[][]) => T[];
export declare const union: <T>(...arrays: T[][]) => T[];
export declare const qkSort: <T>(array: T[], func: (val: T) => number, ascending?: boolean) => T[];
export declare const mgSort: <T>(array: T[], func: (val: T) => number, ascending?: boolean) => T[];
export declare function reverse<T>(array: T[]): T[];
export declare const qkHeuristicFind: <T>(array: T[], func: (val: T) => number) => T;
export declare const mgHeuristicFind: <T>(array: T[], func: (val: T) => number) => T;
export declare const heuristicFind: <T>(array: T[], func: (val: T) => number) => T;
export declare const contains: <T>(array: T[], value: T) => boolean;
export declare const copy: <T>(array: T[]) => T[];
export declare const toggle: <T>(array: T[], value: T) => T[];
export declare const remove: <T>(array: T[], value: T) => T[];
export declare const add: <T>(array: T[], value: T, index?: number) => T[];
export declare const insert: <T>(array: T[], index: number, ...values: T[]) => T[];
export declare const chunk: <T>(array: T[], chunkSize?: number) => T[][];
export declare const last: <T>(array: T[], pos?: number) => T;
export declare function lastValues<T>(array: T[], num?: number): T[];
export declare const first: <T>(array: T[], pos?: number) => T;
export declare function firstValues<T>(array: T[], num?: number): T[];
export declare const any: <T>(array: T[], func: iterator<T, boolean>) => boolean;
export declare const all: <T>(array: T[], func: iterator<T, boolean>) => boolean;
export declare type Chain = {
    value: <type>() => type[];
    link(func: (array: any[], ...args: any[]) => any[], ...args: any[]): Chain;
};
export declare function chain(initValue?: any[]): Chain;
