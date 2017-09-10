import { createRectangle } from 'pura/geometry/tuple';
import { fillRectangle } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';

const text = [
  `Crammed inside this tiny`,
  `  body`,
  `A persecutor, a little,`,
  `  a protector`,
  `An original, an avenger`,
  ``,
  `Forced to live in harmony`,
  ``,
  `~Krista`,
  ``,
  ``
];

const duration = 20000;

const intro = [
  ...text.map((line, index)=> [
    line.toUpperCase(),
    [
      [
        index*duration/text.length,
        {
          fontOptions: {
            style: `white`
          },
          x: -viewWidth/2 + 5,
          y: -viewHeight/5 + 11*index
        }
      ]
    ]
  ]),
  [
    {
      geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

      render() {
        fillRectangle(
          `#00f`,
          [0, 0],
          viewWidth,
          viewHeight,
          0,
        );
      }
    },
    [
      [
        0,
        {
          x: 0,
          y: 0,
          rotation: 0
        }
      ]
    ]
  ]
];

export default intro;
