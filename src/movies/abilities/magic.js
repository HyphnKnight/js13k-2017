import { sparkle } from 'emoji';

const hotOrDot = (hot, enemy)=> Array(100).fill(0).map((el, index)=> [
  !enemy ? sparkle : 0,
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
        y: -100
      }
    ]
  ]
]);

console.log(`hotOrDot(true)`, hotOrDot(true));

export default hotOrDot;
