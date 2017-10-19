import { punch, eye } from '../../emoji.js';

const genPunch = (enemy)=> Array.from(Array(6).keys()).map((index, i, arr)=> [
  !enemy ? punch : eye,
  [
    [
      index*200,
      {
        fontOptions: {
          textBaseline: `middle`,
          style: `white`,
          font: `14px`,
          horizontalAlign: true
        },
        x: 20*Math.cos(index/(arr.length)*-Math.PI*2),
        y: 20*Math.sin(index/(arr.length)*-Math.PI*2),
        rotation: Math.PI/2 - index/(arr.length)*Math.PI*2
      }
    ],
    [
      arr.length*200,
      {
        x: 20*Math.cos(index/(arr.length)*-Math.PI*2),
        y: 20*Math.sin(index/(arr.length)*-Math.PI*2),
        rotation: Math.PI/2 - index/(arr.length)*Math.PI*2
      }
    ],
    [
      arr.length*300,
      {
        x: (progress)=> (20 - 9*progress)*Math.cos(index/(arr.length)*-Math.PI*2 + progress*-Math.PI),
        y: (progress)=> (20 - 9*progress)*Math.sin(index/(arr.length)*-Math.PI*2 + progress*-Math.PI),
      }
    ]
  ]
]);

const defend = (enemy)=> [
  ...genPunch(enemy)
];

export default defend;
