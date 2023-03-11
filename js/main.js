//task1
let from = 0;
let before = 10;
let result = returnNumberFrom(from,before);
//console.log('Число из диапазона ' + from + ' : ' + before + ' равно = '+ result);

function returnNumberFrom(a, b){
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//task2
let string = 'Строка';
let maxLenght = 5;
let answer = checkStringLength(string,maxLenght);
//console.log(answer);

function checkStringLength(string, maxLenght){
  return string.length <= maxLenght;
}

/*
module 4-task1
*/

let array = new Array(25);

for (let i = 1; i <= array.length; i++){
  let element = generatePhoto(i,i);
  array[i-1] = element;
};

array.forEach(element => console.log(element));

function generatePhoto(id, url){
  let descriptions = ['Поползень','Гастеруптиида','Лягушкорот','Квакша','Игуанодонт'];
  let photo = {
    id: id,
    url: 'photos/' + url + '.jpg',
    description: descriptions[returnNumberFrom(0,(descriptions.length - 1))],
    likes: returnNumberFrom(15,200),
    comments: returnNumberFrom(0,200),
  }
  return photo;
}
