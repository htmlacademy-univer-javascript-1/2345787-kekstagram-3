const uploadButton = document.querySelector("#upload-file");
const uploadOverlay = document.querySelector(".img-upload__overlay");
const closeButton = document.querySelector("#upload-cancel");

uploadButton.addEventListener('change', openEditor);
document.addEventListener('keyup', closeEditor);
closeButton.addEventListener('click', closeEditor);

function openEditor(evt){
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeEditor(evt){
  if (evt.key === 'Escape' || evt.target === closeButton){
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadButton.reset();
  }
}


