import { ctx } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';

const Shader = () => {
  const img = ctx.getImageData(0, 0, viewWidth, viewHeight);
  const data = img.data;
  let i = -1;
  while(++i < data.length) data[i] = ((data[i] / 75) | 0) * 75;
  ctx.putImageData(img, 0, 0);
};

export default Shader;
