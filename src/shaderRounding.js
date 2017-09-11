import { ctx } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';

const offset = 75;

const Shader = () => {
  const img = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const data = img.data;
  const dataLen = data.length;
  let i = 0;
  while(i < dataLen) {
    data[i] = ((data[i] / offset) | 0) * offset;
    data[i + 1] = ((data[i + 1] / offset) | 0) * offset;
    data[i + 2] = ((data[i + 2] / offset) | 0) * offset;
    i += 4;
  }

  // overwrite original image
  ctx.putImageData(img, 0, 0);
};

export default Shader;
