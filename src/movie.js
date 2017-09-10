// Play a "movie" using text and/or cEl render objects.
// Movie(
//   x, y, w, h,
//   movieObject,
//   ()=> {
//     // Movie Completed
//   }
// );

// Frame properties:
// `fontOptions` - fillText style options
//   - use it in the first keyframe of text layers
//   - and in keyframes where the `symbol` property is given text
// `x` - mandatory in first keyframe
//   - optional in subsequent keyframes only if it never changes
// `y` - see `x`
// `rotation` - see `x`
// `remove` - layer will no longer render once keyframe time is exceeded
//   - use this only in a particular layer's final keyframe
// `symbol` - swap the given symbol for a different one
//   - only active until the keyframe is exceeded
//   - will be merged with the existing symbol,
//   - so only provide the parts of the symbol you want to overwrite
//   - can be text as well as cEl obj

import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText } from 'pura/canvas/tuple';

const Movie = (x, y, width, height, timeline, callback)=> {
  // Determine movie duration.
  // Find max time among all layers in timeline.
  const duration = timeline.reduce((currDur, layer)=> {
    return Math.max(
      // Is prev element a number or array?
      currDur,
      layer[1][layer[1].length - 1][0]
    );
  }, 0);

  // Convert plaintext into a cEl render object.
  const bootstrapText = (text, fontOptions)=> {
    const { width, height } = ctx.measureText(text);

    return {
      geometry: createRectangle([0 ,0], 0, width, height),

      render() {
        fillText(fontOptions, [0, 0], text);
      }
    };
  };

  // Collect symbols in movie.
  const symbols = timeline.map((layer)=> {
    let symbol = layer[0];

    // Only fontOptions is optionsal in movieObject.
    const { fontOptions={}, x, y, rotation } = layer[1][0][1];

    // Convert plaintext.
    if(typeof symbol === `string`) {
      symbol = bootstrapText(symbol, fontOptions);
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
          // Extract values from previous keyframe.
          // If previous keyframe used function-driven values,
          // set them to their end states.
          for(const prop in prevframe.keyframe) {
            const val = prevframe.keyframe[prop];

            if(typeof val === `function`) {
              prevframe.keyframe[prop] = val(1);
            }
          }

          // Use keyframe symbol or main one.
          if(keyframe.symbol) {
            if(typeof keyframe.symbol === `string`) {
              keyframe.symbol = bootstrapText(keyframe.symbol, keyframe.fontOptions);
            }

            children[children.length - 1 - index] = keyframe.symbol;
          } else {
            children[children.length - 1 - index] = symbols[index];
          }

          const symbol =
            keyframe.symbol
              ? Object.assign({}, symbols[index], keyframe.symbol)
              : symbols[index];

          // Abbreviations.
          const { x:prevX, y:prevY, rotation:prevRot } = prevframe.keyframe;
          const { x:keyX, y:keyY, rotation:keyRot } = keyframe;
          const { geometry:geo } = symbol;
          const { position:geoPos } = geo;

          // Tween properties.
          if(typeof keyX === `function`) {
            geoPos[0] = keyX(progress, prevX, prevY, prevRot, width, height);
          } else if(keyX !== undefined) {
            geoPos[0] = prevX + (keyX - prevX)*progress;
          }
          if(typeof keyY === `function`) {
            geoPos[1] = keyY(progress, prevX, prevY, prevRot, width, height);
          } else if(keyY !== undefined) {
            geoPos[1] = prevY + (keyY - prevY)*progress;
          }
          if(typeof keyRot === `function`) {
            geo.rotation = keyRot(progress, prevX, prevY, prevRot, width, height);
          } else if(keyRot !== undefined) {
            geo.rotation = prevRot + (keyRot - prevRot)*progress;
          }

          // Do not look at future keyframes.
          break;
        }
      }
    }
  };
};

export default Movie;
