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
          layerP.length && layerP[1][layerP[1].length - 1][0] || layerP,
          layerN[1][layerN[1].length - 1][0]
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

    children: symbols.map((symbol, index)=> {
      if(timeline[index][1][0][0] !== 0) {
        return {};
      }

      return symbol;
    }).reverse(),

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

      for(const [index, layer] of timeline.entries()) {
        const keyframes = layer[1];

        let prevframe = {};

        for(const [keyframeIndex, [time, keyframe]] of keyframes.entries()) {
          // Save old keyframe and move on.
          if(diff > time) {
            if(keyframeIndex === 0) {
              children[children.length - 1 - index] = symbols[index];
            }

            if(keyframe.remove) {
              children[children.length - 1 - index] = {};
              break;
            } else {
              prevframe = { time, keyframe };
              continue;
            }
          } else if(keyframeIndex === 0) {
            break;
          }

          if(keyframeIndex === 0) {
            prevframe = { time, keyframe };
          }

          // Percentage of way through keyframe; 0-1.
          let progress = (diff-prevframe.time)/(time - prevframe.time);

          if(progress > 0.995) {
            progress = 1;
          }

          // Setup frame.
          // Use keyframe symbol or main one.
          const symbol =
            keyframe.symbol
              ? Object.assign({}, symbols[index], keyframe.symbol)
              : symbols[index];

          for(const prop in prevframe.keyframe) {
            const val = prevframe.keyframe[prop];

            if(typeof val === `function`) {
              prevframe.keyframe[prop] = val(1);
            }
          }

          const { x:prevX, y:prevY, rotation:prevRot } = prevframe.keyframe;

          // Tween properties.
          if(typeof keyframe.x === `function`) {
            symbol.geometry.position[0] =
              keyframe.x.call(this, progress);
          } else if(keyframe.x !== undefined) {
            symbol.geometry.position[0] =
              prevX + (keyframe.x - prevX)*progress;
          }
          if(typeof keyframe.y === `function`) {
            symbol.geometry.position[1] =
              keyframe.y.call(this, progress);
          } else if(keyframe.y !== undefined) {
            symbol.geometry.position[1] =
              prevY + (keyframe.y - prevY)*progress;
          }
          if(typeof keyframe.rotation === `function`) {
            symbol.geometry.position[1] =
              keyframe.rotation.call(this, progress);
          } else if(keyframe.rotation !== undefined) {
            symbol.geometry.rotation =
              prevRot + (keyframe.rotation - prevRot)*progress;
          }

          // Do not look at future keyframes.
          break;
        }
      }
    }
  };
};

export default Movie;
