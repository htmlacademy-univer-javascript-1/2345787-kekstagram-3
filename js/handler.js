const uploadButton = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');

uploadButton.addEventListener('change', openEditor);
document.addEventListener('keyup', closeEditor);
closeButton.addEventListener('click', closeEditor);

function openEditor(){
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetSlider(currentEffect);
}

function closeEditor(evt){
  if (evt.key === 'Escape' || evt.target === closeButton){
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUploadForm.reset();
    uploadImgPreview.style.transform = `scale(1)`;
  }
}

//Задание 9.9.1
const scaleUpButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleDownButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleControlForm = uploadOverlay.querySelector('.scale__control--value');
const uploadImgPreview = uploadOverlay.querySelector('.img-upload__preview');

function scaleUp(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value + 25) > 100){
    value = 100;
    scaleControlForm.value = `${value}%`
  } else {
    value += 25;
    scaleControlForm.value = `${value}%`
  }
  uploadImgPreview.style.transform = `scale(${value/100})`
}

scaleUpButton.addEventListener('click', scaleUp);

function scaleDown(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value - 25) < 25){
    value = 25;
    scaleControlForm.value = `${value}%`
  } else {
    value -= 25;
    scaleControlForm.value = `${value}%`
  }
  uploadImgPreview.style.transform = `scale(${value/100})`
}

scaleDownButton.addEventListener('click', scaleDown);


//Задание 9.9.2
let currentEffect = imgUploadForm.querySelector('#effect-none');
const checkBoxes = imgUploadForm.querySelectorAll('.effects__radio');

checkBoxes.forEach(effect => {
  effect.addEventListener('click', applyingEffect)
});

function applyingEffect(evt){
  const selectedEffect = evt.target;
  checkBoxes.forEach(effect => {
    if(effect == selectedEffect && selectedEffect !== currentEffect){
      effect.checked = true;
      currentEffect.checked = false;
      uploadImgPreview.classList.remove(`effects__preview--${currentEffect.value}`);
      uploadImgPreview.classList.add(`effects__preview--${effect.value}`);
      currentEffect = selectedEffect;
    }
  })
  resetSlider(selectedEffect);
}

//noUiSlider

import '../nouislider/nouislider.js';

const effectLevelValue = document.querySelector('.effect-level__value');
const effectIntensitySlider = document.querySelector('.effect-level__slider');

let initialSliderValue = 100;

const filterValues = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const initialValues = {
  none: 100,
  chrome: 0,
  sepia: 0,
  marvin: 0,
  phobos: 0,
  heat: 1
};

const maxValues = {
  none: 100,
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3
};

const stepValues = {
  none: 1,
  chrome: 0.1,
  sepia: 0.1,
  marvin: 1,
  phobos: 0.1,
  heat: 0.1
};

noUiSlider.create(effectIntensitySlider, {
  start: initialSliderValue,
  range: {
    min: 0,
    max: 100
  },
  step: 1
});

effectIntensitySlider.noUiSlider.on('update', function (initialSliderValue) {
  effectLevelValue.value = initialSliderValue;
  updateEffect(currentEffect, initialSliderValue);
});

function updateEffect(effect, value){
  let filterValue = '';
  switch(currentEffect.value) {
    case 'chrome':
      filterValue = `${filterValues[effect.value]}(${value})`;
      break;
    case 'sepia':
      filterValue = `${filterValues[effect.value]}(${value})`;
      break;
    case 'marvin':
      filterValue = `${filterValues[effect.value]}(${value}%)`;
      break;
    case 'phobos':
      filterValue = `${filterValues[effect.value]}(${value}px)`;
      break;
    case 'heat':
      filterValue = `${filterValues[effect.value]}(${value})`;
      break;
    default:
      filterValue = '';
    }
  uploadImgPreview.style.filter = filterValue;
}

function resetSlider(effect){
  if (effect.value === 'none') {
    effectIntensitySlider.classList.add('hidden');
  } else {
    effectIntensitySlider.classList.remove('hidden');
  }
  initialSliderValue = initialValues[effect.value];
  effectLevelValue.value = initialSliderValue;
  effectIntensitySlider.noUiSlider.updateOptions({
    start: maxValues[effect.value],
    range: {
      min : initialSliderValue,
      max : maxValues[effect.value]
    },
    step: stepValues[effect.value]
  });
}
