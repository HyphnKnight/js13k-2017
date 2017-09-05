import { createRectangle } from 'pura/geometry/tuple';
import { fillPolygon } from 'pura/canvas/tuple';
import { title_text, base_text, white } from 'style';
import { viewWidth, viewHeight } from 'dom';
import { gem } from 'emoji';

const bigText = {
  textBaseline: `middle`,
  style: white,
  font: title_text,
  horizontalAlign: true
};

const title = [
  [
    `A L T E R`,
    [
      [
        0,
        {
          fontOptions: bigText,
          x: 0,
          y: -viewHeight/2,
          rotation: 0
        }
      ],
      [
        12000,
        {
          y: 0
        }
      ]
    ]
  ],
  [
    gem,
    [
      [
        0,
        {
          fontOptions: bigText,
          x: 0,
          y: viewHeight,
          rotation: 0
        }
      ],
      [
        24000,
        {
          x: (progress)=>-Math.sin(progress*10 - 10)*viewWidth/4,
          y: viewHeight - viewHeight*1.125
        }
      ]
    ]
  ],
  [
    `new game`,
    [
      [
        24500,
        {
          fontOptions: Object.assign({}, bigText, {
            font: base_text
          }),
          x: 0,
          y: 48,
          rotation: 0
        }
      ],
      [
        24600,
        {}
      ]
    ]
  ],
  [
    {
      geometry: createRectangle([0, 0], 0, viewWidth, viewHeight),

      render() {
        (Date.now() % 600 > 400) && fillPolygon(`white`, [-42, 48], [-5, 3, 5, 0, -5, -3]);
      }
    },
    [
      [
        24500,
        {
          x: 0,
          y: 0,
          rotation: 0
        }
      ]
    ]
  ]
];

export default title;

const endTitle = ()=> {
  title[0][1] = [
    [
      0,
      {
        fontOptions: bigText,
        x: 0,
        y: 0,
        rotation: 0
      }
    ]
  ];

  title[1][1] = [
    [
      0,
      {
        fontOptions: bigText,
        x: -Math.sin(0)*viewWidth/4,
        y: viewHeight - viewHeight*1.125,
        rotation: 0
      }
    ]
  ];

  title[2][1][0][0] = 0;

  title[3][1][0][0] = 0;
};

export { endTitle };
