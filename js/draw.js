
function drawPictures(photos){
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#picture');
  const photoBlock = document.querySelector('.pictures');

  for(let i = 0; i < photos.length; i++){
    const picture = template.content.cloneNode(true);
    const receivedPhoto = photos[i];
    picture.querySelector('.picture__img').src = receivedPhoto.url;
    picture.querySelector('.picture__likes').textContent = receivedPhoto.likes;
    picture.querySelector('.picture__comments').textContent = receivedPhoto.comments;
    fragment.appendChild(picture);
  }
  photoBlock.appendChild(fragment);
}

export {drawPictures};
