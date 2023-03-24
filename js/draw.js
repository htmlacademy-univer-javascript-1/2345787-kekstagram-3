function drawPictures(array){
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture');

  for(let i = 0; i < array.length; i++){
    const picture = template.content.cloneNode(true);
    const randomPicture = array[i];
    picture.querySelector('.picture__img').src = randomPicture.url;
    picture.querySelector('.picture__likes').textContent = randomPicture.likes;
    picture.querySelector('.picture__comments').textContent = randomPicture.comments;
    fragment.appendChild(picture);
  }

  const photoBlock = document.querySelector('.pictures');
  photoBlock.appendChild(fragment);
}

export {drawPictures};
