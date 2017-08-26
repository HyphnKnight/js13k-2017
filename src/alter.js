import {
  child,
  avenger,
  protector,
  persecutor,
} from 'emoji';
/*
type Alter = {
  name: string;
  emoji: string;
  maxHealth: number; // > 1 and < 100;
  movement: number; // Range in hexes this unit can move
  ability: string; // the name of the ability they have access to.
}
*/

export const Child = {
  name: 'Child',
  emoji: child,
  maxHealth: 40,
  movement: 3,
  ability: 'forget',
};

export const Avenger = {
  name: 'Avenger',
  emoji: avenger,
  maxHealth: 80,
  movement: 3,
  ability: 'avenge',
};

export const Protector = {
  name: 'Protector',
  emoji: protector,
  maxHealth: 100,
  movement: 2,
  ability: 'protect',
};

export const Persecutor = {
  name: 'Persecutor',
  emoji: persecutor,
  maxHealth: 60,
  movement: 5,
  ability: 'persecute',
};
