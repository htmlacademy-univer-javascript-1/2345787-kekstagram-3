
import {sendData} from './connectionServer.js';
import {closeEditor, addEventsOnEditor} from './handler.js';

const form = document.querySelector('#upload-select-image');
const submitButton = form.querySelector('#upload-submit');

const body = document.querySelector('body');
const successMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate =  body.querySelector('#error').content.querySelector('.error');
let closeErrorMessageOnClickOutside;
let closeSuccessMessageOnClickOutside;

const pristine = new Pristine(form);

const checkLegitLength = (string, minLength, maxLength) => {
  return string >= minLength && string <= maxLength;
  }

  pristine.addValidator(
    form.querySelector('.text__description'),
    (value) => {
      const minlenght = 20;
      const maxlenght = 140;
      return checkLegitLength(value.length, minlenght, maxlenght - 1);
    },
    'Описание должно быть не менее 20 и не более 140 символов'
  );

function checkOfSubmitForm(event){
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid){
    const sentData = new FormData(event.target);
    sendData(
      successfulSendProcessing,
      errorSendProcessing,
      sentData
    );
  } else {
    errorSendProcessing;
  }
}

function showSuccessMessage(){
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.addEventListener('keyup', checkForEscapeToCloseSuccesMassage);
  successButton.addEventListener('click', closeSuccessMessage);
  body.appendChild(successMessage);

  closeSuccessMessageOnClickOutside = (event) => {
    if (event.target === successMessage) {
      closeSuccessMessage();
    }
  }
  body.addEventListener('click',closeSuccessMessageOnClickOutside);
}

function checkForEscapeToCloseSuccesMassage(event){
  if (event.key === 'Escape') {
    closeSuccessMessage();
  }
}

function successfulSendProcessing(){
  disableSubmitButton();
  closeEditor();
  showSuccessMessage();
  enableSubmitButton();
  form.reset();
}

function closeSuccessMessage(){
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  document.removeEventListener('keyup', checkForEscapeToCloseSuccesMassage);
  body.removeEventListener('click', closeSuccessMessageOnClickOutside);
}

function errorSendProcessing(){
  addEventsOnEditor(false);
  showErrorMessage();
  enableSubmitButton();
}

function showErrorMessage(){
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keyup', checkForEscapeToCloseErrorMassage);
  body.appendChild(errorMessage);
  errorMessage.style.zIndex = '9999';

  closeErrorMessageOnClickOutside = (event) => {
    if (event.target === errorMessage) {
      closeErrorMessage();
    }
  }
  body.addEventListener('click',closeErrorMessageOnClickOutside);
}

function closeErrorMessage(){
  const errorMessage = body.querySelector('.error');
  errorMessage.remove();
  addEventsOnEditor(true);
  document.removeEventListener('keyup', checkForEscapeToCloseErrorMassage);
  body.removeEventListener('click', closeErrorMessageOnClickOutside);
}

function checkForEscapeToCloseErrorMassage(event){
  if(event.key === 'Escape') {
    closeErrorMessage();
  }
}

function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Загрузка..';
}

function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

export {checkOfSubmitForm, showErrorMessage}
