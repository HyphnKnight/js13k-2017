import {
  tree,
  treeAlt,
  child,
  protector,
  persecutor,
  avenger,
  cloud,
  mountain,
  tulip,
  ghost,
  pool,
  gem,
} from 'emoji';

// size is a scale relative to 16px.
export const createSprite = (emoji, size = 1) => ([x, y], z = 0) => ([x, y, z, emoji, size]);
export const mkTree = createSprite(tree, 2);
export const mkTreeAlt = createSprite(treeAlt, 2);
export const mkChild = createSprite(child);
export const mkProtector = createSprite(protector);
export const mkPersecutor = createSprite(persecutor);
export const mkAvenger = createSprite(avenger);
export const mkCloud = createSprite(cloud);
export const mkMountain = createSprite(mountain, 4);
export const mkTulip = createSprite(tulip, 0.5);
export const mkGhost = createSprite(ghost);
export const mkPool = createSprite(pool);
export const mkGem = createSprite(gem);
