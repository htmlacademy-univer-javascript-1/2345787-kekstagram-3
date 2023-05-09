import '../nouislider/nouislider.js';
import {checkOfSubmitForm, showErrorMessage} from './validator.js'

const uploadButton = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImgPreview = uploadOverlay.querySelector('.img-upload__preview');
const effectsRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');

const scaleUpButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleDownButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleControlForm = uploadOverlay.querySelector('.scale__control--value');

const effectLevelValue = document.querySelector('.effect-level__value');
const effectIntensitySlider = document.querySelector('.effect-level__slider');

let currentEffect = imgUploadForm.querySelector('#effect-none');
let scaleLevel = 100;

let initialSliderValue = 100;

const FilterValues = {
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  MARVIN: 'invert',
  PHOBOS: 'blur',
  HEAT: 'brightness'
};

const InitialValues = {
  NONE: 100,
  CHROME: 0,
  SEPIA: 0,
  MARVIN: 0,
  PHOBOS: 0,
  HEAT: 1
};

const MaxValues = {
  NONE: 100,
  CHROME: 1,
  SEPIA: 1,
  MARVIN: 100,
  PHOBOS: 3,
  HEAT: 3
};

const StepValues = {
  NONE: 1,
  CHROME: 0.1,
  SEPIA: 0.1,
  MARVIN: 1,
  PHOBOS: 0.1,
  HEAT: 0.1
};

uploadButton.addEventListener('change', openEditor);

function addEventsOnEditor(needToAdd){
  if (needToAdd){
    document.addEventListener('keyup', checkForEscapeToCloseEditor);
    closeButton.addEventListener('click', closeEditor);
    //imgUploadForm -> form
    imgUploadForm.addEventListener('submit', checkOfSubmitForm);
    scaleUpButton.addEventListener('click', scaleUp);
    scaleDownButton.addEventListener('click', scaleDown);
  } else {
    document.removeEventListener('keyup', checkForEscapeToCloseEditor);
    closeButton.removeEventListener('click', closeEditor);
    //imgUploadForm -> form
    imgUploadForm.removeEventListener('submit', checkOfSubmitForm);
    scaleUpButton.removeEventListener('click', scaleUp);
    scaleDownButton.removeEventListener('click', scaleDown);
  }
}

function checkForEscapeToCloseEditor(event){
  if(event.key === 'Escape') {
    closeEditor();
  }
}

function openEditor(){
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetSlider(currentEffect);
  addEventsOnEditor(true);
  uploadIMG();
}

function uploadIMG(){
  const uploadFile = document.querySelector('#upload-file').files[0];
  const imgPreview = document.querySelector('.img-upload__preview').children[0];
  const fileReader = new FileReader();
  fileReader.onloadend = function(){
    imgPreview.src = fileReader.result;
  };

  if (uploadFile.type.split('/')[0] !== "image") {
    showErrorMessage();
    closeEditor();
    imgUploadForm.reset();
  }
  fileReader.readAsDataURL(uploadFile);
}

function closeEditor(){
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadForm.reset();
  uploadImgPreview.style.transform = 'scale(1)';
  const nonEffect = effectsRadioButtons[0];
  toggleEffect(currentEffect, nonEffect);
  resetSlider(currentEffect);
  addEventsOnEditor(false);
}

function scaleUp(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value + 25) > 100){
    value = 100;
    scaleControlForm.value = `${value}%`;
  } else {
    value += 25;
    scaleControlForm.value = `${value}%`;
  }
  scaleLevel = value;
  uploadImgPreview.style.transform = `scale(${value/100})`;
}

function scaleDown(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value - 25) < 25){
    value = 25;
    scaleControlForm.value = `${value}%`;
  } else {
    value -= 25;
    scaleControlForm.value = `${value}%`;
  }
  scaleLevel = value;
  uploadImgPreview.style.transform = `scale(${value/100})`;
}

effectsRadioButtons.forEach((effect) => {
  effect.addEventListener('click', applyingEffect);
});

function applyingEffect(event){
  const selectedEffect = event.target;
  if(selectedEffect !== currentEffect){
    toggleEffect(currentEffect, selectedEffect);
  }
  resetSlider(selectedEffect);
}

function toggleEffect(previousEffect, newEffect){
  uploadImgPreview.classList.remove(`effects__preview--${previousEffect.value}`);
  uploadImgPreview.classList.add(`effects__preview--${newEffect.value}`);
  newEffect.checked = true;
  previousEffect.checked = false;
  currentEffect = newEffect;
}

noUiSlider.create(effectIntensitySlider, {
  start: initialSliderValue,
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  connect: 'lower'
});

effectIntensitySlider.noUiSlider.on('update', (sliderValue) => {
  effectLevelValue.value = sliderValue;
  updateEffect(currentEffect, sliderValue);
});

function updateEffect(effect, value){
  let filterValue = '';
  switch(currentEffect.value.toLowerCase()) {
    case 'chrome':
      filterValue = `${FilterValues[effect.value.toUpperCase()]}(${value})`;
      break;
    case 'sepia':
      filterValue = `${FilterValues[effect.value.toUpperCase()]}(${value})`;
      break;
    case 'marvin':
      filterValue = `${FilterValues[effect.value.toUpperCase()]}(${value}%)`;
      break;
    case 'phobos':
      filterValue = `${FilterValues[effect.value.toUpperCase()]}(${value}px)`;
      break;
    case 'heat':
      filterValue = `${FilterValues[effect.value.toUpperCase()]}(${value})`;
      break;
    default:
      filterValue = '';}
  uploadImgPreview.style.filter = filterValue;
}

function resetSlider(effect){
  if (effect.value === 'none') {
    effectIntensitySlider.classList.add('hidden');
  } else {
    effectIntensitySlider.classList.remove('hidden');
  }
  initialSliderValue = InitialValues[effect.value.toUpperCase()];
  effectLevelValue.value = initialSliderValue;

  effectIntensitySlider.noUiSlider.updateOptions({
    start: MaxValues[effect.value.toUpperCase()],
    range: {
      min : initialSliderValue,
      max : MaxValues[effect.value.toUpperCase()]
    },
    step: StepValues[effect.value.toUpperCase()]
  });
}

export {closeEditor, addEventsOnEditor};
