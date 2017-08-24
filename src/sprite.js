import {
  palette
} from './render';
import {
  tree,
  treeAlt,
  child,
  protector,
  persecutor,
  avenger,
  cloud,
  mountain,
  ghost,
  pool,
  diamond,
} from './emoji';

const { fillText } = palette;

export const createSprite = (emoji) => ([x, y], z = 0) => ([x, y, z, emoji]);
export const mkTree = createSprite(tree);
export const mkTreeAlt = createSprite(treeAlt);
export const mkChild = createSprite(child);
export const mkProtector = createSprite(protector);
export const mkPersecutor = createSprite(persecutor);
export const mkAvenger = createSprite(avenger);
export const mkCloud = createSprite(cloud);
export const mkMountain = createSprite(mountain);
export const mkGhost = createSprite(ghost);
export const mkPool = createSprite(pool);
export const mkDiamond = createSprite(diamond);

export const drawSprite = ([x, y, _d, _z, emoji]) => fillText({}, [x, y], emoji);
