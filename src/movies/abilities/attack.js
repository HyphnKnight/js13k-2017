import { flame } from 'emoji';

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
      2500,
      {
        x: index > 0 ? 20*Math.cos(index/(arr.length - 1)*Math.PI*2) : 0,
        y: index > 0 ? 20*Math.sin(index/(arr.length - 1)*Math.PI*2) : 0
      }
    ],
    [
      5000,
      {
        x: (progress, prevX)=>
          prevX + ((prevX | 0) > 0 ? 1 : (prevX | 0) < 0 ? -1 : 0)*progress*progress*160,
        y: (progress, prevX, prevY)=> (prevX | 0) === 0
          ? prevY + progress*progress*-192*(6*(index/arr.length) + 5)
          : -Math.pow(
            prevX + ((prevX | 0) > 0 ? 1 : (prevX | 0) < 0 ? -1 : 0)*progress*progress*160 - prevX
            , 2
          )*(0.5*(index/arr.length + 0.1)) + prevY
      }
    ]
  ]
]);

const attack = [
  ...genFlame
];

export default attack;
