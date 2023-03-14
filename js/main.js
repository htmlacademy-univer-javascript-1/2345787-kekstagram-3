import {generatePhoto} from './data.js';
import {getNumber} from './utility.js';

const specifiedNumber = getNumber(25);
const array = new Array(specifiedNumber);

for (let i = 1; i <= array.length; i++){
  const element = generatePhoto(i,i);
  array[i-1] = element;
}


