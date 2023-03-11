//task1

function returnNumberFrom(a, b){
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//task2
//eslint-disable-next-line
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

function generatePhoto(id, url){
  const descriptions = ['Поползень','Гастеруптиида','Лягушкорот','Квакша','Игуанодонт'];
  const urlString = `photos/` + url + `.jpg`;
  const photo = {
    id: id,
    url: urlString,
    description: descriptions[returnNumberFrom(0,(descriptions.length - 1))],
    likes: returnNumberFrom(15,200),
    comments: returnNumberFrom(0,200),
  };
  return photo;
}
