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
import { initializeMap, turnOrder, moveCharacter } from 'battle/grid';
import Move from 'battle/actions/Move';
import Attack from 'battle/actions/Attack';
import Swarmer from 'battle/actions/Swarmer';
import state from 'state';

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
    move: (character) => [`Move`, () => selectedAction = Move(character)],
    attack: (character) => [character[0].abilities.attack.name, () => selectedAction = Attack(character)],
    swarmer: (character) => Swarmer(character),
    // defense: (character, { name, range, percentage, duration }) => ([name, () => selectedAction = function* () {
    //   // 1) Detect & display all eligible characters
    //   const [, , position] = character;
    //   // 1) Detect & Display possible attackers
    //   clear(optionHexes);
    //   const nearbyTargets = getNearbyAllies(position, range);
    //   optionHexes.push(...nearbyTargets);
    //   // 2) Wait for confirmation
    //   let confirmed = false;
    //   const confirmMenuIndex = uiElements.push(Menu([
    //     [`Confirm`, () => confirmed = true],
    //     [`Cancel`, () => { }],
    //   ]));
    //   while(confirmed) {
    //     cameraControls();
    //     yield;
    //   }
    //   uiElements.splice(confirmMenuIndex, 1);
    //   // 3) Add status effect
    //   nearbyTargets
    //     .map(getCharacterAtHex)
    //     .filter(x => x)
    //     .forEach(([, , , status]) => status.push({
    //       type: `shield`,
    //       duration,
    //       percentage,
    //     }));
    //   // 4) Play animation
    // }()]),
    // magic: (character, { name, range, effect }) => ([name, () => selectedAction = (function* () {
    //   const [data, , position] = character;
    //   // 1) Detect & display all eligible characters
    //   clear(optionHexes);
    //   const nearbyTargets = [getNearbyAllies(position, range), getNearbyEnemies(position, range)];
    //   optionHexes.push(...nearbyTargets);
    //   // 2) Select Target
    //   let selectedTarget = null;
    //   while(!selectedTarget) {
    //     cameraControls();
    //     const { click, mousePosition } = inputs;
    //     if(click === 1) {
    //       state.target = getGridHexFromVector2d(
    //         scaleSet(calcWorldPosition(mousePosition), 1 / gridScale)
    //       );
    //       if(contains(optionHexes, state.target)) selectedTarget = getCharacterAtHex(state.target);
    //     }
    //     yield;
    //   }
    //   clear(optionHexes);
    //   // 3) confirm (maybe?)
    //   // Will comeback to this is this seems necessary
    //   // 4) Add status effect
    //   const [tData, , , tStatus] = selectedTarget;
    //   tStatus.push({
    //     name: data.alignment === tData.alignment
    //       ? `hot`
    //       : `dot`,
    //     effect,
    //   });
    //   // 5) Play animation
    // })()]),
  };

  const getCharacter = generateGetCharacter(turnOrder);
  function* Turn() {
    // 1) Determine who's turn it is.
    const { value: character } = getCharacter.next();
    const [data, , position] = character;
    console.log(`------------------------------`);
    console.log(`Start of turn for ${data.name}`);
    // 2) Center Camera on that person.
    const panCamera = moveCharacter(camera, add(cameraOffset, position), 2000);
    console.log(`Paning Camera from ${camera} to ${add(cameraOffset, position)}`);
    while(!panCamera()) yield;
    // 3) Look up actions
    selectedAction = null;
    if(data.type) {
      const actions = Object.keys(data.abilities).map(name => action[name](character, data.abilities[name]));
      // 4) Add actions to the menu
      const menuUIIndex = uiElements.push(Menu(actions));
      // 5) Wait for player to select an action.
      while(!selectedAction) yield;
      uiElements.splice(menuUIIndex - 1, 1);
    } else {
      selectedAction = action[data.name.toLowerCase()](character);
    }
    // 6) Execute selected action
    while(true) {
      const { done } = selectedAction.next();
      if(done) break;
      else yield;
    }
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
