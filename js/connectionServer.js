const SERVER_URL_DATA = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const SERVER_URL_SEND = 'https://27.javascript.pages.academy/kekstagram-simple';

const getData = (onSuccess, onError) => {
  fetch(SERVER_URL_DATA).then((response)=>{
    if (response.ok) {
      response.json().then((content) => {
        onSuccess(content);
      });
    } else {
      onError();
    }
  });
};

function errorNotification(){
  const body = document.querySelector('body');
  const messageBlock = document.createElement('div');
  const messageText = document.createElement('p');
  const closeButton = document.createElement('button');
  messageBlock.classList.add('data-upload__message');
  messageText.textContent = 'Ошибка запроса данных с сервера';
  messageBlock.appendChild(messageText);
  closeButton.textContent = 'Закрыть';
  closeButton.classList.add('close-button');
  closeButton.addEventListener('click', () => {
    messageBlock.remove();
  });
  messageBlock.appendChild(closeButton);
  body.appendChild(messageBlock);
}

const sendData = (onSuccess, onError, body) => {
  fetch(
    SERVER_URL_SEND,
    {
      method: 'POST',
      body: body
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(() => {
    onError();
  });
};

export {getData, errorNotification, sendData};
