
import {sendData} from "./connectionServer.js";
import {closeEditor, addEventsOnCloseEditor} from "./handler.js";

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');
let errorButton;

const pristine = new Pristine(form);

form.addEventListener('submit', (event) =>{
  event.preventDefault();

  if (pristine.validate()){
    const sentData = new FormData(event.target);
    sendData(
      successfulSendProcessing,
      errorSendProcessing,
      sentData
    )
  }
})

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate =  body.querySelector('#error').content.querySelector('.error');

function showSuccessMessage(){
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.addEventListener('keyup', checkForEscapeToCloseSuccesMassage);
  successButton.addEventListener('click', closeSuccessMessage);
  body.appendChild(successMessage);
}

function checkForEscapeToCloseSuccesMassage(evt){
  if(evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function successfulSendProcessing(){
  disableSubmitButton();
  closeEditor();
  showSuccessMessage();
  enableSubmitButton();
}

function closeSuccessMessage(){
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  document.removeEventListener('keyup', checkForEscapeToCloseSuccesMassage);
}

function errorSendProcessing(){
  showErrorMessage();
  enableSubmitButton();
}

function showErrorMessage(){
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const newErrorButton = errorMessage.querySelector('.error__button');
  errorButton = newErrorButton;
  addEventsOnCloseEditor(false);
  addEventsOnCloseErrorMessage(true);
  body.appendChild(errorMessage);
  errorMessage.style.zIndex = '9999';
}

function closeErrorMessage(){
  const errorMessage = body.querySelector('.error');
  errorMessage.remove();
  addEventsOnCloseEditor(true);
  addEventsOnCloseErrorMessage(false);
}

function addEventsOnCloseErrorMessage(add){
  if (add){
    errorButton.addEventListener('click', closeErrorMessage);
    document.addEventListener('keyup', checkForEscapeToCloseErrorMassage);
  } else{
    errorButton.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keyup', checkForEscapeToCloseErrorMassage);
  }
}

function checkForEscapeToCloseErrorMassage(evt){
  if(evt.key === 'Escape') {
    closeErrorMessage()
  };
}


function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Загрузка..';
}

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}
