//task1
let from = 0;
let before = 10;
let result = returnNumberFrom(from,before);
console.log('Число из диапазона ' + from + ' : ' + before + ' равно = '+ result);

function returnNumberFrom(from, before){
  if(before > from){
    return Math.random() * (before - from) + from;
  }
  if(frome == before){
    return from;
  }
  return Math.random() * (from - before) + before;
}

//task2
let line = 'Строка';
let maxLenght = 5;
let answer = checkLength(line,maxLenght);
console.log(answer);

function checkLength(line, maxLenght){
  if (line.length > maxLenght){
    return false;
  }
  return true;
}


