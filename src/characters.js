import {
  child, avenger, protector, persecutor,
  scorpion, bat, skull,
  mask, winter, drama, dragon,
} from './emoji.js';

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
      magic: {
        range: 4,
        effect: 20,
        duration: 3
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
      attack: {
        name: `Avenge`,
        range: 1,
        damage: 25,
      }
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
      defend: {
        range: 1,
        duration: 1,
        percentage: 0.8,
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
      attack: {
        count: 10,
        range: 4,
        damage: 30,
      },
      defend: {
        count: 10,
        range: 3,
        percentage: 0.5,
        duration: 3,
      },
      magic: {
        count: 10,
        range: 1,
        effect: 50,
        duration: 1
      },
      reset: {
        count: 3
      },
    },
  },

  /* The Bad Guys */

  swarmer: {
    name: `Swarmer`,
    emoji: scorpion,
    type: false,
    maxHealth: 20,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 1,
        damage: 5,
      }
    }
  },

  vamp: {
    name: `Vamp`,
    emoji: bat,
    type: false,
    maxHealth: 20,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiMagic: {
        range: 1,
        duration: 1,
        effect: 5,
      }
    }
  },

  skeli: {
    name: `Skeli`,
    emoji: skull,
    type: false,
    maxHealth: 30,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiAttack: {
        range: 1,
        damage: 10,
      },
      aiDefend: {
        range: 1,
        duration: 1,
        percentage: 0.25,
      }
    }
  },

  resentment: {
    name: `Resentment`,
    emoji: mask,
    isBoss: true,
    type: false,
    maxHealth: 60,
    abilities: {
      aiMove: {
        type: false,
        range: 5,
      },
      aiAttack: {
        range: 1,
        damage: 40,
      },
    }
  },

  doubt: {
    name: `Doubt`,
    emoji: winter,
    isBoss: true,
    type: false,
    maxHealth: 60,
    abilities: {
      aiAttack: {
        range: 10,
        damage: 10,
      },
    }
  },

  deceit: {
    name: `Deceit`,
    emoji: drama,
    isBoss: true,
    type: false,
    maxHealth: 60,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 1,
        damage: 10,
      },
      aiMagic: {
        range: 3,
        effect: 10,
        duration: 3,
      },
      aiDefend: {
        range: 2,
        duration: 2,
        percentage: 0.25,
      },
    }
  },

  harm: {
    name: `Harm`,
    emoji: dragon,
    isBoss: true,
    type: false,
    maxHealth: 120,
    abilities: {
      aiMove: {
        type: true,
        range: 3,
      },
      aiAttack: {
        range: 3,
        damage: 10,
      },
      aiMagic: {
        range: 3,
        effect: 10,
        duration: 3,
      },
      aiDefend: {
        range: 2,
        duration: 2,
        percentage: 0.25,
      },
    }
  },

};
