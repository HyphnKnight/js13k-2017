import { uiElements } from 'ui';
import Menu from 'menu';
import Attack from 'battle/actions/Attack';
import Defend from 'battle/actions/Defend';
import Magic from 'battle/actions/Magic';

export default function* Item(character) {
  const [data] = character;
  console.log(`1) Give the option to select for different abilities`);
  let selectedAction = null;
  const actions = [
    data.abilities.attack.count && [`Abuse (${data.abilities.attack.count})`, () => {
      --data.abilities.attack.count;
      selectedAction = Attack;
    }],
    data.abilities.defend.count && [`Pretend (${data.abilities.defend.count})`, () => {
      --data.abilities.defend.count;
      selectedAction = Defend;
    }],
    data.abilities.magic.count && [`Critique (${data.abilities.magic.count})`, () => {
      --data.abilities.magic.count;
      selectedAction = Magic;
    }],
    data.abilities.reset.count && [`Remember (${data.abilities.reset.count})`, () => {
      --data.abilities.reset.count;
      selectedAction = Attack;
    }],
  ].filter(x => x);
  // 4) Add actions to the menu
  const menuUIIndex = uiElements.push(Menu(actions)) - 1;
  // 5) Wait for player to select an action.
  while(!selectedAction) yield;
  uiElements.splice(menuUIIndex, 1);
  console.log(`2) Do Action`);
  yield* selectedAction(character);
}
