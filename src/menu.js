// Display modal text.
// Menu([
//   [`CommandLabel1`, ()=> {
//     //Handler1
//   }],
//   [`CommandLabel2`, ()=> {
//     //Handler2
//   }]
// ]);

import { createRectangle } from 'pura/geometry/tuple';
import { ctx, fillText } from 'pura/canvas/tuple';
import { drawBox, stroke, textSize, lineHeight, white } from 'style';
import { inputs } from 'controls';
import { canvas, viewHeight, viewWidth } from 'dom';
import { pointRight } from 'emoji';

const Menu = (commands)=> {
  // Menu dimensions.
  let menuWidth = viewWidth/3;
  const menuHeight = lineHeight*commands.length + stroke*2;
  let menuX = viewWidth/2 - menuWidth/2 - stroke/2;
  const menuY = viewHeight/2 - menuHeight/2;

  let activeCommandIndex = 0;

  const children = [];

  // Create command render objects.
  for(const [index, [text, handler]] of commands.entries()) {
    const label = text.toUpperCase();

    const txtMetrics = ctx.measureText(label);
    menuWidth = Math.max(menuWidth, txtMetrics.width + stroke*4);

    children.push(
      {
        geometry: createRectangle(
          [
            -menuWidth/2 + stroke*2,
            index*lineHeight - stroke*2
          ], 0, menuWidth, lineHeight
        ),

        render() {
          fillText({ style: white }, [0, 0], label);

          // Render pointer hand.
          if(activeCommandIndex === index) {
            fillText({}, [-13, 0], pointRight);
          }
        }
      }
    );
  }

  // Reposition menu.
  menuX = viewWidth/2 - menuWidth/2 - stroke/2;

  // Render menu.
  return {
    geometry: createRectangle([menuX, menuY], 0, menuWidth, menuHeight),

    children,

    render() {
      drawBox([0, 0], menuWidth, 0, menuHeight);

      // Keyboard controls.
      if(inputs.down) {
        if(activeCommandIndex < commands.length - 1) {
          activeCommandIndex++;
        }
      } else if(inputs.up) {
        if(activeCommandIndex > 0) {
          activeCommandIndex--;
        }
      }
      if(inputs.space || inputs.return) {
        commands[activeCommandIndex][1]();
      }
    }
  };
};

export default Menu;
