let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let submitButton = document.querySelector('.popup__submit-btn');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let captionInput = formElement.querySelector('.popup__input_type_caption');


function popupVisibility() {
  if (popup.classList.contains('popup_opened') === false) {
    popup.classList.add('popup_opened');
  } else {
    popup.classList.remove('popup_opened');
  }
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameProfile = document.querySelector('.profile__name');
    let caption = document.querySelector('.profile__caption');

    nameProfile.textContent = nameInput.value;
    caption.textContent = captionInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', popupVisibility);
closeButton.addEventListener('click', popupVisibility);
submitButton.addEventListener('click', popupVisibility);


