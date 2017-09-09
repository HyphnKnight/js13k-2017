import { child, avenger, protector, persecutor } from 'emoji';

export default {
  child: {
    name: `Child`,
    emoji: child,
    maxHealth: 40,
    abilities: {
      move: {
        range: 3,
      },
    },
  },

  avenger: {
    name: `Avenger`,
    emoji: avenger,
    maxHealth: 80,
    abilities: {
      move: {
        range: 3,
      },
    },
  },

  protector: {
    name: `Protector`,
    emoji: protector,
    maxHealth: 100,
    abilities: {
      move: {
        range: 2,
      },
    },
  },

  persecutor: {
    name: `Persecutor`,
    emoji: persecutor,
    maxHealth: 60,
    abilities: {
      move: {
        range: 5,
      },
    },
  },
};
