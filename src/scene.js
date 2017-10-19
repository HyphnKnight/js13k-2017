import { clearUi } from './ui.js';

let activeScene;

const Scene = (scene)=> {
  clearUi();

  scene.init();

  activeScene && activeScene.dismiss();

  activeScene = scene;
};

export default Scene;
