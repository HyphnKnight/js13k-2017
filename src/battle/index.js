/*
How to create a battle scene.
Scene(createBattleScene([
  [`avenger`, [0, 0, 0]],
  [`child`, [1, 0, -1]],
  [`protector`, [-1, 1, 0]],
  [`persecutor`, [-1, 0, 1]],
],5));
*/

import { add } from 'pura/vector/tuple';
import { camera, } from 'camera';
import { uiElements } from 'ui';
import Song from 'audio';
import battleMusic from 'songs/summer';
import finalBossMusic from 'songs/winter';
import Menu from 'menu';
import StatusBar from 'battle/statusBar';
import BattleMap from 'battle/map';
import { initializeMap, turnOrder, moveCharacter, getGridHexFromVector2d } from 'battle/grid';
import Move from 'battle/actions/Move';
import Attack from 'battle/actions/Attack';
import Defend from 'battle/actions/Defend';
import Magic from 'battle/actions/Magic';
import Item from 'battle/actions/Item';
import Swarmer from 'battle/actions/Swarmer';
import Vamp from 'battle/actions/Vamp';
import state from 'state';
import { handlStatuses } from 'battle/actions/utility';

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

export default function createBattleScene(characters, mapSize) {
  initializeMap(characters, mapSize);

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
  };

  const getCharacter = generateGetCharacter(turnOrder);
  function* Turn() {
    // 1) Determine who's turn it is.
    const { value: character } = getCharacter.next();
    const [data, health, position] = character;
    state.target = getGridHexFromVector2d(position);
    console.log(`------------------------------`);
    console.log(`${data.name} : ${health}`);
    // 2) Center Camera on that person.
    const panCamera = moveCharacter(camera, add(cameraOffset, position), 2000);
    console.log(`Paning Camera from ${camera} to ${add(cameraOffset, position)}`);
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
    console.log(`------------------------------`);
    return isVictory ? 1 :
      isDefeat ? 2 :
        0;
  }

  const bgMusic = new Song(battleMusic || finalBossMusic);

  return {
    init: () => {
      bgMusic.play(bgMusic);
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
        } else if(done && value === 2) {
          // 9C) DEFEAT
        }
      };
    },
    dismiss: () => {
      bgMusic.stop();
    },
  };
}
