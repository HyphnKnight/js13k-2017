import {
  tree,
  treeAlt,
  avenger,
  cloud,
  mountain,
} from './emoji';

export const createSprite = (emoji) => ([x, y], offset = 0) => ([x, y, emoji, offset]);
export const mkTree = createSprite(tree);
export const mkTreeAlt = createSprite(treeAlt);
export const mkAvenger = createSprite(avenger);
export const mkCloud = createSprite(cloud);
export const mkMountain = createSprite(mountain);
