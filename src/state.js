const state = {
  // Dialog is an array of dialog data
  // dialog data is an array with the following values
  // [text:string,author?:[emoji:string,name:string]];
  // [
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis purus sed luctus dignissim. Phasellus hendrerit quam et urna tempor, eu porttitor dui feugiat. Praesent vestibulum est lectus, et vehicula velit laoreet non.',
  //   [avenger, `Avenger${Math.floor(Math.random() * 10)}`],
  // ]
  dialog: [],
  position: [0, 0],
};



export default state;
