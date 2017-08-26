import { statusBar } from 'statusBar';
import { uiElements, clearUi } from 'ui';

export default () => {
  clearUi();
  uiElements.push(statusBar);
};