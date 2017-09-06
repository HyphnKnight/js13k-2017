import { flame } from '../../emoji.js';

const genFlame = Array.from(Array(9).keys()).map((index, i, arr)=> [
  flame,
  [
    [
      0,
      {
        fontOptions: {
          textBaseline: `middle`,
          style: `white`,
          font: `12px`,
          horizontalAlign: true
        },
        x: 0,
        y: 0,
        rotation: 0
      }
    ],
    [
      arr.length*250 - index*100,
      {
        x: 0,
        y: 0
      }
    ],
    [
      arr.length*250,
      {
        x: (progress)=> progress*100,
        y: (progress)=> -Math.pow(progress*100, 2)*0.01
      }
    ]
  ]
]);

const attack = [
  ...genFlame
];

export default attack;
