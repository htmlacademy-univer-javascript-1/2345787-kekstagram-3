import {returnNumberFrom} from './utility.js';

function generatePhoto(id, url){
  const descriptions = ['Поползень','Гастеруптиида','Лягушкорот','Квакша','Игуанодонт'];
  const urlString = `photos/${url}.jpg`;
  const photo = {
    id: id,
    url: urlString,
    description: descriptions[returnNumberFrom(0,(descriptions.length - 1))],
    likes: returnNumberFrom(15,200),
    comments: returnNumberFrom(0,200),
  };
  return photo;
}

export {generatePhoto};
