import loop from 'loop';
import { render as renderUI, palette } from 'ui';
import { render as renderGraphics } from 'overworld_graphics';
import logic from 'overworld_logic';
import { playCanonD } from 'audio';

playCanonD();

loop(dt => {

  // Logic
  logic(dt);

  // Graphics
  palette.clear();

  renderGraphics();
  renderUI();

});

