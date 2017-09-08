import { createRectangle } from 'pura/geometry/tuple';
import { fillRectangle } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from 'dom';
import { clock0, clock1, clock2, clock3, clock4, clock5 } from 'emoji';

const clocks = [clock1, clock2, clock3, clock4, clock5, clock0];

const clockturn = [...clocks, ...clocks, ...clocks].map((clockface, index)=> [
  index*250 + 250,
  {
    symbol: clockface,
    fontOptions: {
      textBaseline: `middle`,
      style: `white`,
      font: `72px monospace`,
      horizontalAlign: true
    },
    x: 0,
    y: 0
  }
]);

const clock = [
  clock0,
  [
    [
      0,
      {
        fontOptions: {
          textBaseline: `middle`,
          style: `white`,
          font: `72px monospace`,
          horizontalAlign: true
        },
        x: 0,
        y: 0
      }
    ],
    ...clockturn
  ]
];

const reset = [
  [
    {
      geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

      render() {
        fillRectangle(
          `#fff`,
          [0, 0],
          viewWidth,
          viewHeight,
          0,
        );
      }
    },
    [
      [
        clockturn.length*250 - 100,
        {
          x: 0,
          y: 0
        }
      ]
    ]
  ],
  clock
];

export default reset;
