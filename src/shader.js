import paletteInit from 'nearest-color';
import hex2rgb from 'hex-rgb';
import { ctx } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';

const atariPalette = [
  `#000`,
  `#440`,
  `#702800`,
  `#841800`,
  `#880000`,
  `#78005c`,
  `#480078`,
  `#140084`,
  `#000088`,
  `#00187c`,
  `#002c5c`,
  `#003c2c`,
  `#003c00`,
  `#143800`,
  `#2c3000`,
  `#442800`,
  `#404040`,
  `#646410`,
  `#844414`,
  `#983418`,
  `#9c2020`,
  `#8c2074`,
  `#602090`,
  `#302098`,
  `#1c209c`,
  `#1c3890`,
  `#1c4c78`,
  `#1c5c48`,
  `#205c20`,
  `#345c1c`,
  `#4c501c`,
  `#644818`,
  `#6c6c6c`,
  `#848424`,
  `#985c28`,
  `#ac5030`,
  `#b03c3c`,
  `#a03c88`,
  `#783ca4`,
  `#4c3cac`,
  `#3840b0`,
  `#3854a8`,
  `#386890`,
  `#387c64`,
  `#407c40`,
  `#507c38`,
  `#687034`,
  `#846830`,
  `#909090`,
  `#a0a034`,
  `#ac783c`,
  `#c06848`,
  `#c05858`,
  `#b0589c`,
  `#8c58b8`,
  `#6858c0`,
  `#505cc0`,
  `#5070bc`,
  `#5084ac`,
  `#509c80`,
  `#5c9c5c`,
  `#6c9850`,
  `#848c4c`,
  `#a08444`,
  `#b0b0b0`,
  `#b8b840`,
  `#bc8c4c`,
  `#d0805c`,
  `#d07070`,
  `#c070b0`,
  `#a070cc`,
  `#7c70d0`,
  `#6874d0`,
  `#6888cc`,
  `#689cc0`,
  `#68b494`,
  `#74b474`,
  `#84b468`,
  `#9ca864`,
  `#b89c58`,
  `#c8c8c8`,
  `#d0d050`,
  `#cca05c`,
  `#e09470`,
  `#e08888`,
  `#d084c0`,
  `#b484dc`,
  `#9488e0`,
  `#7c8ce0`,
  `#7c9cdc`,
  `#7cb4d4`,
  `#7cd0ac`,
  `#8cd08c`,
  `#9ccc7c`,
  `#b4c078`,
  `#d0b46c`,
  `#dcdcdc`,
  `#e8e85c`,
  `#dcb468`,
  `#eca880`,
  `#eca0a0`,
  `#dc9cd0`,
  `#c49cec`,
  `#a8a0ec`,
  `#90a4ec`,
  `#90b4ec`,
  `#90cce8`,
  `#90e4c0`,
  `#a4e4a4`,
  `#b4e490`,
  `#ccd488`,
  `#e8cc7c`,
  `#ececec`,
  `#fcfc68`,
  `#ecc878`,
  `#fcbc94`,
  `#fcb4b4`,
  `#ecb0e0`,
  `#d4b0fc`,
  `#bcb4fc`,
  `#a4b8fc`,
  `#a4c8fc`,
  `#a4e0fc`,
  `#a4fcd4`,
  `#b8fcb8`,
  `#c8fca4`,
  `#e0ec9c`,
  `#fce08c`
];

const nearestToAtari = paletteInit.from(atariPalette);

const Atarify = ()=> {
  const img = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const data = img.data;
  const dataLen = data.length;

  for(let i = 0; i < dataLen; i += 4) {
    const [ r,g,b ] =
      hex2rgb(nearestToAtari({
        r: data[i],
        g: data[i + 1],
        b: data[i + 2]
      }));

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  // overwrite original image
  ctx.putImageData(img, 0, 0);
};

export default Atarify;
