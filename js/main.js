//task1
/*
const from = 0;
const before = 10;
const res = returnNumberFrom(from,before);
console.log('Число из диапазона ' + from + ' : ' + before + ' равно = '+ res);
*/

function returnNumberFrom(a, b){
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//task2
/*
const line = 'Строка';
const mLenght = 5;
const answer = checkStringLength(line,mLenght);
console.log(answer);
*/
function checkStringLength(string, maxLenght){
  return string.length <= maxLenght;
}

/*
module 4-task1
*/

const array = new Array(25);

for (let i = 1; i <= array.length; i++){
  const element = generatePhoto(i,i);
  array[i-1] = element;
}

//array.forEach(element => console.log(element));

function generatePhoto(id, url){
  const descriptions = ['Поползень','Гастеруптиида','Лягушкорот','Квакша','Игуанодонт'];
  const photo = {
    id: id,
    url: 'photos/' + url + '.jpg',
    description: descriptions[returnNumberFrom(0,(descriptions.length - 1))],
    likes: returnNumberFrom(15,200),
    comments: returnNumberFrom(0,200),
  };
  return photo;
}
