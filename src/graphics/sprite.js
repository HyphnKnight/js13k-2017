import {
  palette
} from './index';
import {
  tree,
  treeAlt,
  avenger,
  cloud,
  mountain,
  ghost,
} from './emoji';

const { fillText } = palette;

export const createSprite = (emoji) => ([x, y], z = 0) => ([x, y, z, emoji]);
export const mkTree = createSprite(tree);
export const mkTreeAlt = createSprite(treeAlt);
export const mkAvenger = createSprite(avenger);
export const mkCloud = createSprite(cloud);
export const mkMountain = createSprite(mountain);
export const mkGhost = createSprite(ghost);

export const drawSprite = ([x, y, _d, _z, emoji]) => fillText({}, [x, y], emoji);
