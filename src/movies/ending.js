import { createRectangle } from 'pura/geometry/tuple';
import { fillRectangle } from 'pura/canvas/tuple';
import { viewWidth, viewHeight } from '../dom.js';
import { avenger, protector, persecutor, child, gem } from '../emoji.js';

const characters = [avenger, protector, persecutor, child, gem].map((character, index)=> [
  character,
  [
    [
      2000 + index*800,
      {
        x: viewWidth/4,
        y: viewHeight/2
      }
    ],
    [
      2000 + index*800 + 2000,
      {
        x: 0,
        y: 0
      }
    ],
    [
      2000 + index*800 + 2800,
      {
        x: 0,
        y: 0
      }
    ],
    [
      2000 + index*800 + 3800,
      {
        x: 0,
        y: -viewHeight
      }
    ]
  ]
]);

const ending = [
  ...characters,
  // [
  //   gem,
  //   [
  //     [
  //       6000 + characters.length*800,
  //       {
  //         x: viewWidth/4,
  //         y: viewHeight/2
  //       }
  //     ],
  //     [
  //       6000 + characters.length*800 + 2000,
  //       {
  //         x: 0,
  //         y: 0
  //       }
  //     ],
  //     [
  //       6000 + characters.length*800 + 2800,
  //       {
  //         x: 0,
  //         y: 0
  //       }
  //     ],
  //     [
  //       6000 + characters.length*800 + 3800,
  //       {
  //         x: 0,
  //         y: -viewHeight
  //       }
  //     ]
  //   ]
  // ],
  [
    `~ fin  RL, BB`,
    [
      [
        14000,
        {
          fontOptions: {
            style: `#000`
          },
          x: -viewWidth/2 + 2,
          y: viewHeight/2 - 4
        }
      ],
      [
        6000 + characters.length*800 + 4900,
        {}
      ]
    ]
  ],
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

export default ending;
