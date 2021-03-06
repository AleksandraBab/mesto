let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let submitButton = document.querySelector('.popup__submit-btn');
let popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let captionInput = formElement.querySelector('.popup__input_type_caption');

let nameProfile = document.querySelector('.profile__name');
let caption = document.querySelector('.profile__caption');

let likeButtons = document.querySelectorAll('.element__like-btn');

likeButtons.forEach(function(item) {
  item.addEventListener('click', function() {
  item.classList.toggle('element__like-btn_liked');
  item.classList.add('element__like-btn_blocked')})

  item.addEventListener('mouseout', function(){
  item.classList.remove('element__like-btn_blocked')})
});

function popupOpen() {
    popup.classList.toggle('popup_opened');

  nameInput.value =  nameProfile.textContent;
  captionInput.value = caption.textContent;
}

function popupClose() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    caption.textContent = captionInput.value;

    popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);



