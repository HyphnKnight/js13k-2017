import { createRectangle } from 'lib/geometry';
import { canvas, ctx, viewHeight, viewWidth } from 'dom';
import { heart, blackHeart } from 'emoji';

const textSize = 12;
const lineHeight = textSize * 1.2;

let name = "Avenger";
let maxHealth = Math.random() * 80 + 20
let health = Math.random() * (maxHealth-10) + 10

export const statusBar = {
  geometry: createRectangle([0,-viewHeight/2+lineHeight/2], 0, viewWidth, lineHeight),
  render({fillText},{ geometry }) {
    let heartContainers = Math.ceil(maxHealth / 10) + 1;
    let filledContainers = Math.ceil(health / 10) + 1;
    while(--heartContainers>=0) fillText({ font: `6px mono` },[viewWidth/2 - 8*heartContainers,2],blackHeart);
    while(--filledContainers>=0) fillText({ font: `6px mono` },[viewWidth/2 - 8*filledContainers,2],heart);
    fillText({style:'white',font:`10px mono`},[-viewWidth/2,2],name);
  }
}