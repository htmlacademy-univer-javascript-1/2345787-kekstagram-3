const uploadButton = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadImgPreview = uploadOverlay.querySelector('.img-upload__preview');

let currentEffect = imgUploadForm.querySelector('#effect-none');

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
    uploadImgPreview.style.transform = 'scale(1)';
  }
}

//Задание 9.9.1
const scaleUpButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleDownButton = uploadOverlay.querySelector('.scale__control--smaller');
const scaleControlForm = uploadOverlay.querySelector('.scale__control--value');

function scaleUp(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value + 25) > 100){
    value = 100;
    scaleControlForm.value = `${value}%`;
  } else {
    value += 25;
    scaleControlForm.value = `${value}%`;
  }
  uploadImgPreview.style.transform = `scale(${value/100})`;
}

scaleUpButton.addEventListener('click', scaleUp);

function scaleDown(){
  let value = Number(scaleControlForm.value.replace('%',''));
  if ((value - 25) < 25){
    value = 25;
    scaleControlForm.value = `${value}%`;
  } else {
    value -= 25;
    scaleControlForm.value = `${value}%`;
  }
  uploadImgPreview.style.transform = `scale(${value/100})`;
}

scaleDownButton.addEventListener('click', scaleDown);


//Задание 9.9.2
const checkBoxes = imgUploadForm.querySelectorAll('.effects__radio');

checkBoxes.forEach((effect) => {
  effect.addEventListener('click', applyingEffect);
});

function applyingEffect(evt){
  const selectedEffect = evt.target;
  checkBoxes.forEach((effect) => {
    if(effect === selectedEffect && selectedEffect !== currentEffect){
      effect.checked = true;
      currentEffect.checked = false;
      uploadImgPreview.classList.remove(`effects__preview--${currentEffect.value}`);
      uploadImgPreview.classList.add(`effects__preview--${effect.value}`);
      currentEffect = selectedEffect;
    }
  });
  resetSlider(selectedEffect);
}

//noUiSlider
import '../nouislider/nouislider.js';
const effectLevelValue = document.querySelector('.effect-level__value');
const effectIntensitySlider = document.querySelector('.effect-level__slider');

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
