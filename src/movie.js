//Play a "movie" using text and/or cEl render objects.
// Movie(
//   x, y, w, h,

//   [
//     [
//       200,
//       [
//         `ALTER`,
//         {
//           x: 0,
//           y: 0,
//           rot: 0
//         }
//       ],
//       [
//         obj,
//         {
//           x: Math.sin,
//           y: 0,
//           rot: 0
//         }
//       ]
//     ],
//     [
//       1200,
//       [
//         `ALTER`,
//         {
//           x: 0,
//           y: 0,
//           rot: 0
//         }
//       ],
//       [
//         obj,
//         {
//           x: 0,
//           y: 0,
//           rot: 0
//         }
//       ]
//     ]
//   ]
// );

import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText } from 'pura/canvas/tuple';

const Movie = (x, y, width, height, frames)=> {
  const start = Date.now();

  return {
    geometry: createRectangle([x, y], 0, width, height),

    children: [],

    render({children}) {
    }
  };
};

export default Movie;
