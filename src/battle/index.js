/*
How to create a battle scene.
Scene(createBattleScene([
  [`avenger`, [0, 0, 0]],
  [`child`, [1, 0, -1]],
  [`protector`, [-1, 1, 0]],
  [`persecutor`, [-1, 0, 1]],
],5));
*/

import { add, rotateSet, scaleSet } from 'pura/vector/tuple';
import { camera, } from 'camera';
import { uiElements } from 'ui';
// import Song from 'audio';
// import battleMusic from 'songs/summer';
// import finalBossMusic from 'songs/winter';
import Menu from 'menu';
import StatusBar from 'battle/statusBar';
import BattleMap from 'battle/map';
import { initializeMap, turnOrder, moveCharacter, getGridHexFromVector2d } from 'battle/grid';
import {
  Attack, Defend, Magic, Item, Move
} from 'battle/actions/AbilitiesPlayer';
import {
  Swarmer, Vamp, Skeli,
  Resentment, Doubt, Deceit,
} from 'battle/actions/BehaviorAI';
import { handlStatuses } from 'battle/actions/utility';
import state from 'state';
import Scene from 'scene';
import overworld from 'overworld';

const cameraOffset = [0, -150];

function* generateGetCharacter(turnOrder) {
  let i = 0;
  while(true) {
    const char = turnOrder[i % (turnOrder.length)];
    ++i;
    const [, health] = char;
    if(health > 0) {
      yield char;
    }
  }
}

let harmTurns = 0;

const baseArray = [
  [`avenger`, [0, 0, 0]],
  [`child`, [1, 0, -1]],
  [`protector`, [-1, 1, 0]],
  [`persecutor`, [-1, 0, 1]],
];

const randomEnemyLocation = () => getGridHexFromVector2d(
  rotateSet(
    scaleSet(
      [0, 1],
      60 + Math.random() * 100
    ),
    Math.random() * Math.PI
  )
);

export const generateBattle =
  (swarmers, vamps, skelis, boss) => {
    const battle = [...baseArray];
    let i = -1;
    const len = Math.max(swarmers, vamps, skelis);
    while(++i < len) {
      if(i < swarmers) battle.push([`swarmer`, randomEnemyLocation()]);
      if(i < vamps) battle.push([`vamp`, randomEnemyLocation()]);
      if(i < skelis) battle.push([`skeli`, randomEnemyLocation()]);
    }
    boss && battle.push([boss, randomEnemyLocation()]);
    return battle;
  };

export function createBattleScene(swarmers, vamps, skelis, boss) {
  const characters = generateBattle(swarmers, vamps, skelis, boss);
  initializeMap(characters);

  let turn = null;
  let selectedAction = null;
  const action = {
    // Player Controlled Character Movement
    move: [`Move`, () => selectedAction = Move],
    attack: [`Avenge`, () => selectedAction = Attack],
    defend: [`Protect`, () => selectedAction = Defend],
    magic: [`Forget`, () => selectedAction = Magic],
    item: [`Use`, () => selectedAction = Item],
    swarmer: Swarmer,
    vamp: Vamp,
    skeli: Skeli,
    resentment: Resentment,
    doubt: Doubt,
    deceit: Deceit,
    *harm() {
      yield* [Doubt, Resentment, Deceit][++harmTurns % 9 / 3 | 0];
    }
  };

  const getCharacter = generateGetCharacter(turnOrder);
  function* Turn() {
    // 1) Determine who's turn it is.
    const { value: character } = getCharacter.next();
    const [data, , position] = character;
    state.target = getGridHexFromVector2d(position);
    // 2) Center Camera on that person.
    const panCamera = moveCharacter(camera, add(cameraOffset, position), 2000);
    while(!panCamera()) yield;
    // 3) Look up actions
    selectedAction = null;
    if(data.type) {
      let actions;
      switch(data.name) {
        case `Persecutor`:
          actions = [
            action.move,
            action.item,
          ];
          break;
        default:
          actions = Object.keys(data.abilities).map(name => action[name]);
        // 4) Add actions to the menu
      }
      const menuUIIndex = uiElements.push(Menu(actions));
      // 5) Wait for player to select an action.
      while(!selectedAction) yield;
      uiElements.splice(menuUIIndex - 1, 1);
    } else {
      selectedAction = action[data.name.toLowerCase()];
    }
    // 6) Execute selected action
    yield* selectedAction(character);
    handlStatuses(character);
    // 7) Check to see if battle is over
    const isVictory = false;//!!turnOrder.find(([data, health]) => !data.alignment && health > 0);
    const isDefeat = false;//!isVictory && !!turnOrder.find(([data, health]) => data.alignment && health > 0);
    return isVictory ? 1 :
      isDefeat ? 2 :
        0;
  }

  // const bgMusic = new Song(battleMusic || finalBossMusic);

  return {
    init: () => {
      // bgMusic.play(bgMusic);
      camera[2] = 340;
      uiElements.push(BattleMap, StatusBar);
      turn = Turn();
      state.logic = () => {
        // done: is turn over.
        // value: battle status, 0: ongoing, 1: victory, 2: defeat;
        const { value, done } = turn.next();
        if(done && value === 0) {
          // 8) Increment turn counter
          // 9A) Create New turn
          turn = Turn();
        } else if(done && value === 1) {
          // 9B) VICTORY
          Scene(overworld);
        } else if(done && value === 2) {
          // 9C) DEFEAT
        }
      };
    },
    dismiss: () => {
      // bgMusic.stop();

    },
  };
}
