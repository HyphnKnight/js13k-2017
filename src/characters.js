import {
  child, avenger, protector, persecutor,
  scorpion,
} from 'emoji';

export default {

  /* The Good Guys */

  child: {
    name: `Child`,
    emoji: child,
    type: true,
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
    type: true,
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
    type: true,
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
    type: true,
    maxHealth: 60,
    abilities: {
      move: {
        range: 5,
      },
    },
  },

  /* The Bad Guys */

  swarmer: {
    name: `Swarmer`,
    emoji: scorpion,
    type: false,
    maxHealth: 30,
    abilities: {
      swarm: {
        range: 5,
      }
    }
  }

};
