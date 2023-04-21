const SERVER_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const SERVER_URL_SEND = 'https://27.javascript.pages.academy/kekstagram-simple';

const getData = (onSuccess, onError) => {
  fetch(SERVER_URL).then((response)=>{
    if (response.ok) {
      response.json().then((content) => {
        onSuccess(content)})
    } else {
      onError();
    }
  })
}

function errorNotification(answer){
  //eslint-disable-next-line
  console.error('Ошибка при получении данных с сервера.')
}

const sendData = (onSuccess, onError, body)=> {
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
  }).catch((err) => {
    onError();
  });
};


export {getData, errorNotification, sendData, SERVER_URL};
