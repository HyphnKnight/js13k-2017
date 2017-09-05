/*
THOUGHTS:
What about if after you win a battle you can now roam around the small area
and there's a pool in the center which ports you back up to the overworld
TODO:
[ ] Design Map need ground cover and clouds equivalent (preferably animated in some way)
[ ] Need to detect a 'win state'
*/

import loop from 'loop';
import StatusBar from 'statusBar';
import BattleMap, { grid, mapOffset } from 'map';
import state from 'state';
import { inputs } from 'controls';
import { getFromVector2d, vector2dToHex, hexToVector2d, get } from 'pura/hex';
import { add, subtractSet, scale } from 'pura/vector/tuple';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { calcWorldPosition } from 'camera';
import { clear } from 'pura/canvas/tuple';

export default {
  init() {
    uiElements.push(BattleMap, StatusBar);
    state.logic = () => {
      const { click, mousePosition } = inputs;
      if (click === 1) {
        state.target = getFromVector2d(grid)(scale(calcWorldPosition(mousePosition), 1 / 40));
      } else if (click === 0) {
        state.target = null;
      }
    };
  },
  dismiss() { }
};
