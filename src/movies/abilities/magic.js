import { sparkle, heartPurple, shout, needle } from '../..  /emoji.js';
import { easeOutQuad } from 'easing';

const hotOrDot = (hot, enemy)=> Array(100).fill(0).map((el, index)=> [
  !enemy
    ? (hot ? sparkle : heartPurple)
    : (hot ? needle : shout),
  [
    [
      index*16,
      {
        fontOptions: {
          textBaseline: `middle`,
          style: `white`,
          font: `12px`,
          horizontalAlign: true
        },
        x: 0,
        y: 0
      }
    ],
    [
      index*16 + 1000,
      {
        x: Math.random()*100 - 50,
        y: (progress)=> easeOutQuad(progress)*-100
      }
    ]
  ]
]);

export default hotOrDot;
