import { avenger } from 'emoji';

const state = {
  // Dialog is an array of dialog data
  // dialog data is an array with the following values
  // [text:string,author?:[emoji:string,name:string]];
  // [
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis purus sed luctus dignissim. Phasellus hendrerit quam et urna tempor, eu porttitor dui feugiat. Praesent vestibulum est lectus, et vehicula velit laoreet non.',
  //   [avenger, `Avenger${Math.floor(Math.random() * 10)}`],
  // ]
  dialog: [
    [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan eu metus et porta. Ut rutrum aliquam velit, et euismod lorem maximus non. Etiam non magna sit amet velit molestie tempor vel lacinia est. Aenean convallis placerat ante ultricies venenatis. Maecenas erat tellus, bibendum in enim id, porta consectetur purus. Curabitur rhoncus pulvinar volutpat. Vestibulum condimentum sem sed sollicitudin elementum. Nunc eget est eleifend, feugiat arcu ut, tincidunt lectus. Proin interdum augue in neque aliquet sollicitudin. Mauris posuere eget elit eu fermentum. Mauris viverra, ante ac pretium tincidunt, nunc felis egestas enim, nec placerat libero justo eu felis. Nulla ipsum mi, condimentum mattis nibh sed, scelerisque pharetra magna. Donec laoreet et lectus ut congue. Donec vulputate ac nulla nec facilisis.`,
      [avenger, `ya mum`]
    ]
  ],
  position: [0, 0],
  target: null,
};



export default state;
