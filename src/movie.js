//Play a "movie" using text and/or cEl render objects.
// Movie(
//   x, y, w, h,

//   [
//     [
//       `ALTER`,
//       [
//         [
//           0,
//           {
//             fontOptions: { // Can't be animated.
//               style: `#fff`
//             },
//             x: 0,
//             y: -100,
//             rotation: 0
//           }
//         ],
//         [
//           1200,
//           {
//             x: 0,
//             y: 0,
//             rotation: 0
//           }
//         ]
//       ]
//     ],
//     [
//       obj,
//       [
//         [
//           600,
//           {
//             x: 0,
//             y: 100
//           }
//         ],
//         [
//           800,
//           {
//             symbol: obj,
//             x: 20,
//             y: 80
//           }
//         ],
//         [
//           1200,
//           {
//             x: Math.sin,
//             y: -20,
//             rotation: 0
//           }
//         ]
//       ]
//     ]
//   ],
//   ()=> {
//     // Movie Completed
//   }
// );

import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText } from 'pura/canvas/tuple';

const Movie = (x, y, width, height, timeline, callback)=> {
  // Determine movie duration.
  const duration =
    timeline.length === 1
      ? timeline[0][1][timeline[0][1].length - 1][0]
      : timeline.reduce((layerP, layerN)=> {
        return Math.max(
          layerP[1][layerP.length - 1][0],
          layerN[1][layerP.length - 1][0]
        );
      });

  // Collect symbols in movie.
  const symbols = timeline.map((layer)=> {
    let symbol = layer[0];

    const { fontOptions={}, x, y, rotation } = layer[1][0][1];

    // Convert plaintext into cEl render object.
    if(typeof symbol === `string`) {
      const text = symbol;
      const { width, height } = ctx.measureText(text);

      symbol = {
        geometry: createRectangle([0 ,0], 0, width, height),

        render() {
          fillText(fontOptions, [0, 0], text);
        }
      };
    }

    // Setup symbol for its first render.
    symbol.geometry.position = [x, y];
    symbol.geometry.rotation = rotation;

    return symbol;
  });

  let callbackFired = false;

  const start = Date.now();

  return {
    geometry: createRectangle([x, y], 0, width, height),

    children: [],

    render({ children }) {
      const now = Date.now();
      const diff = now - start;

      if(diff > duration) {
        if(callback && !callbackFired) {
          callback();
          callbackFired = true;
        }
        return;
      }

      // Clear out previous frame.
      children.length = 0;

      for(const [index, layer] of timeline.entries()) {
        const keyframes = layer[1];

        let prevframe = {};

        for(const [keyframeIndex, [time, keyframe]] of keyframes.entries()) {
          // Save old keyframe and move on.
          if(diff > time) {
            prevframe = { time, keyframe };
            continue;
          }
          if(keyframeIndex === 0) {
            prevframe = { time, keyframe };
          }

          // Percentage of way through keyframe; 0-1.
          const progress = (diff-prevframe.time)/time;

          // Setup frame.
          // Use keyframe symbol or main one.
          const symbol =
            keyframe.symbol
              ? Object.assign({}, symbols[index], keyframe.symbol)
              : symbols[index];

          const { x:prevX, y:prevY, rotation:prevRot } = prevframe.keyframe;

          // Tween properties.
          symbol.geometry.position[0] =
            prevX + (keyframe.x - prevX)*progress;
          symbol.geometry.position[1] =
            prevY + (keyframe.y - prevY)*progress;
          symbol.geometry.rotation =
            prevRot + (keyframe.rotation - prevRot)*progress;

          // Add symbol to the render stack.
          children.unshift(symbol);

          // Do not look at future keyframes.
          break;
        }
      }
    }
  };
};

export default Movie;
