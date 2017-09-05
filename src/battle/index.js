/*
THOUGHTS:
What about if after you win a battle you can now roam around the small area
and there's a pool in the center which ports you back up to the overworld
TODO:
[ ] Design Map need ground cover and clouds equivalent (preferably animated in some way)
[ ] Need to detect a 'win state'
*/

import StatusBar from 'statusBar';
import BattleMap, { grid, mapOffset, gridScale } from 'map';
import state from 'state';
import { camera } from 'camera';
import { inputs } from 'controls';
import { getFromVector2d, vector2dToHex, hexToVector2d, get } from 'pura/hex';
import { add, subtractSet, scaleSet } from 'pura/vector/tuple';
import { uiElements } from 'ui';
import { calcWorldPosition } from 'camera';

export default {
  init() {
    uiElements.push(BattleMap, StatusBar);
    camera[0] = 0;
    camera[1] = 60;
    camera[2] = 30;
    state.logic = () => {
      if(camera[0] !== 0) camera[0] += -camera[0] * 0.01;
      if(camera[1] !== 140) camera[1] += (140 - camera[1]) * 0.01;
      if(camera[2] !== 250) camera[2] += (250 - camera[2]) * 0.01;
      const { click, mousePosition } = inputs;
      if(click === 1) {
        state.target = getFromVector2d(grid)(scaleSet(subtractSet(calcWorldPosition(mousePosition), mapOffset), 1 / gridScale));
      }
    };
  },
  dismiss() { }
};
