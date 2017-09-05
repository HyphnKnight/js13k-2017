import { child, avenger, protector, persecutor } from 'emoji';

export default {
  child: {
    name: `Child`,
    emoji: child,
    maxHealth: 40,
    movement: 3,
    ability: `forget`,
  },

  avenger: {
    name: `Avenger`,
    emoji: avenger,
    maxHealth: 80,
    movement: 3,
    ability: `avenge`,
  },

  protector: {
    name: `Protector`,
    emoji: protector,
    maxHealth: 100,
    movement: 2,
    ability: `protect`,
  },

  persecutor: {
    name: `Persecutor`,
    emoji: persecutor,
    maxHealth: 60,
    movement: 5,
    ability: `persecute`,
  },
};
