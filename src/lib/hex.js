import { flatten, any } from 'lib/array';
import { lerp as nLerp } from 'lib/math';
const neighborPosition = [
  [0, 0, -1],
  [1, 0, -1],
  [1, 0, 0],
  [0, 0, 1],
  [-1, 0, 1],
  [-1, 0, 0],
];
function roundHexXYZ(hex) {
  const rHex = [
    Math.round(hex[0]),
    Math.round(hex[1]),
    Math.round(hex[2]),
  ];
  const dHex = [
    Math.abs(rHex[0] - hex[0]),
    Math.abs(rHex[1] - hex[1]),
    Math.abs(rHex[2] - hex[2]),
  ];
  if(dHex[0] > dHex[1] && dHex[0] > dHex[2]) {
    rHex[0] = -rHex[1] - rHex[2];
  }
  else if(dHex[1] > dHex[2]) {
    rHex[1] = -rHex[0] - rHex[2];
  }
  else {
    rHex[2] = -rHex[0] - rHex[1];
  }
  return rHex;
}
export const hexPixelPosition = (hex) => ([
  Math.sqrt(3) * (hex[0] + hex[2] / 2),
  1.5 * hex[2],
]);
const convertQRToXYZ = (qr) => ([qr[0], qr[1], -qr[0] - qr[1]]);
export const distanceFromTo = (hex, targetHex) => (Math.abs(hex[0] - targetHex[0]) +
    Math.abs(hex[1] - targetHex[1]) +
    Math.abs(hex[2] - targetHex[2])) / 2;
export const add = (hexA) => (hexB) => ([
  hexA[0] + hexB[0],
  hexA[1] + hexB[1],
  hexA[2] + hexB[2],
]);
export const subtract = (hexA) => (hexB) => ([
  hexA[0] - hexB[0],
  hexA[1] - hexB[1],
  hexA[2] - hexB[2],
]);
export const getNeighbors = (hex) => neighborPosition.map(add(hex));
export const lerp = (hexA, hexB, dt) => ([
  nLerp(hexA[0], hexB[0], dt),
  nLerp(hexA[1], hexB[1], dt),
  nLerp(hexA[2], hexB[2], dt),
]);
export const lineFromTo = (src, dest) => {
  const distance = distanceFromTo(src, dest);
  const path = [];
  for(let i = 0; i < distance; ++i) {
    path[i] = roundHexXYZ(lerp(src, dest, (i + 1) / distance));
  }
  return path;
};
export const getWithin = (hex, radius) => {
  const hexes = [];
  for(let dx = -radius; dx <= radius; ++dx) {
    const limit = Math.min(radius, -dx + radius);
    for(let dy = Math.max(-radius, -dx - radius); dy <= limit; ++dy) {
      hexes.push(convertQRToXYZ([
        dx + hex[0],
        -dx - dy + hex[2],
      ]));
    }
  }
  return hexes;
};
export const getRing = (hex, distance) => {
  const distanceHex = convertQRToXYZ([-distance, distance]);
  let currentHex = add(hex)(distanceHex);
  const path = [];
  for(let i = 0; i < 6; ++i) {
    for(let j = 0; j < distance; ++j) {
      currentHex = add(currentHex)(neighborPosition[i]);
      path.push(currentHex);
    }
  }
  return path;
};
export const getSpiral = (hex, distance) => {
  const results = [];
  for(let i = 0; i < distance; ++i) {
    results.push(getRing(hex, i));
  }
  return flatten(results);
};
export const getFieldOfView = (hex, range, isBlocked) => getWithin(hex, range).filter((tHex) => !isBlocked(tHex) &&
    !any(lineFromTo(hex, tHex), isBlocked));
export const generateGrid = (radius) => {
  const rows = radius * 2 + 1;
  const grid = [];
  for(let y = 0; y < rows; ++y) {
    const row = y <= radius
      ? radius + 1 + y
      : radius * 3 + 1 - y;
    for(let x = 0; x < row; ++x) {
      if(!grid[y])
        grid[y] = [];
      grid[y][x] = convertQRToXYZ([
        -radius - Math.min(0, y - radius) + x,
        y - radius,
      ]);
    }
  }
  return grid;
};
