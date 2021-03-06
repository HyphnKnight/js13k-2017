/*
TODO:
[ ] Render enemies names differently (font? color?)
*/

import { createRectangle } from 'pura/geometry/tuple';
import { fillText } from 'pura/canvas/tuple';
import { viewHeight, viewWidth } from '../dom.js';
import { heartGrow, heartBlack } from '../emoji.js';
import { getCharacterAtHex } from './grid.js';
import { statusBarHeartFont, statusBarFont } from '../style.js';
import state from '../state.js';

const textSize = 12;
const lineHeight = textSize * 1.2;

const StatusBar = ({
  geometry: createRectangle([0, -viewHeight / 2 + lineHeight / 2], 0, viewWidth, lineHeight),
  render() {
    const character = getCharacterAtHex(state.target);
    if(!character) return;
    const [entity, health] = character;
    const { maxHealth, name } = entity;
    let heartContainers = Math.ceil(maxHealth / 10) + 1;
    let filledContainers = Math.ceil(health / 10) + 1;
    while(--heartContainers >= 0) fillText(statusBarHeartFont, [(viewWidth / 2 - 11) - 8 * heartContainers, 2], heartBlack);
    while(--filledContainers >= 0) fillText(statusBarHeartFont, [(viewWidth / 2 - 11) - 8 * filledContainers, 2], heartGrow);
    fillText(statusBarFont, [-viewWidth / 2, 2], name);
  }
});

export default StatusBar;
