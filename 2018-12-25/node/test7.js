const uuid=require('uuid/v4');
const path=require('path');
let file='1.txt';

let newfilename=`${uuid().replace(/\-/g,'')}${path.extname(file)}`;
console.log(newfilename); //5bd04b745c5f4a48b1bc2a86150e987b.txt

