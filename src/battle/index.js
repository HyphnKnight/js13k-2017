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
import BattleMap from 'map';
import state from 'state';
import { inputs } from 'controls';
import { subtractSet } from 'pura/vector/tuple';
import { canvasOffsetLeft, canvasOffsetTop, scaleX, scaleY } from 'dom';
import { render as renderUI, uiElements, clearUi } from 'ui';
import { calcWorldPosition } from 'camera';
import { clear } from 'pura/canvas/tuple';

export default {
  init() {
    uiElements.push(BattleMap, StatusBar);
    state.logic = () => {
      state.target = inputs.click
        ? calcWorldPosition(inputs.mousePosition)
        : null;
    };
  },
  dismiss() { }
};
