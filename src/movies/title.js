import { title_text, base_text, white, black } from 'style';
import { viewWidth, viewHeight } from 'dom';
import { gem } from 'emoji';

const bigText = {
  textBaseline: `middle`,
  style: white,
  font: title_text,
  horizontalAlign: true
};

export default [
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
        24000,
        {
          x: 0,
          y: 0,
          rotation: 0
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
          fontOptions: bigText
      ]
    ]
  ]
];
