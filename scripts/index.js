import {Card, popupImage} from '../scripts/Card.js'
import {openPopup, closePopup, closeWithClick} from '../scripts/utils.js'
import FormValidator from '../scripts/FormValidator.js'

/* Объявляем переменные */

const initialCards = [
  {
    name: 'Рускеала',
    link: 'images/ruskeala.jpg'
  },
  {
    name: 'Финский залив',
    link: 'images/finzaliv.jpg'
  },
  {
    name: 'Иркутск',
    link: 'images/irkutsk.jpg'
  },
  {
    name: 'Выборг',
    link: 'images/vyborgsity.jpg'
  },
  {
    name: 'Ленинградская область',
    link: 'images/Lenobl.jpg'
  },
  {
    name: 'Мунку-Сардык',
    link: 'images/munku.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const cardContainer = document.querySelector('.elements__grid-items');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const caption = document.querySelector('.profile__caption');

const popupEdit = document.querySelector('.popup_type_edit');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const captionInput = formElementEdit.querySelector('.popup__input_type_caption')
const submitEditButton = formElementEdit.querySelector('.popup__submit-btn_type_edit');

const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const placeSrc = formElementAdd.querySelector('.popup__input_type_src');
const submitAddButton = formElementAdd.querySelector('.popup__submit-btn_type_add');

/* Валидируем формы*/

const AddValidator = new FormValidator (config, formElementAdd);
const EditValidator = new FormValidator (config, formElementEdit);

AddValidator.enableValidation();
EditValidator.enableValidation()

/* Работаем с попапами */

const clearErrorElements = (formElement) => {
  const errorList = Array.from(formElement.querySelectorAll('.popup__error'));
  errorList.forEach ((error) => {
    error.classList.remove('popup__error_active')
  });

  const errorInputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  errorInputList.forEach ((error) => {
    error.classList.remove('popup__input_type_error')
  });
}

const openPopupAdd = () => {
  placeInput.value = '';
  placeSrc.value = '';

  AddValidator.setDisableButton(submitAddButton)
  clearErrorElements(formElementAdd);
  openPopup(popupAdd);
}

const openPopupEdit = () => {
  nameInput.value = nameProfile.textContent;
  captionInput.value = caption.textContent;

  EditValidator.setAbleButton(submitEditButton)
  clearErrorElements(formElementEdit);
  openPopup(popupEdit);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  caption.textContent = captionInput.value;

  closePopup(popupEdit);
}

/* Работаем с карточками */

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  cardContainer.append(cardElement);
});

const cardSubmitHandler = (evt) => {
  evt.preventDefault();

  const card = new Card({name: placeInput.value, link: placeSrc.value});
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement)

  closePopup(popupAdd);
  formElementAdd.reset();
}

/* Вызываем события */

formElementEdit.addEventListener('submit', (evt) => {
  const inputList = Array.from(formElementEdit.querySelectorAll(config.inputSelector));
  if (!EditValidator.checkFormValidity (inputList)) {
    formSubmitHandler(evt);
  }
  });

formElementAdd.addEventListener('submit', (evt) => {
  const inputList = Array.from(formElementAdd.querySelectorAll(config.inputSelector));
  if (!AddValidator.checkFormValidity (inputList)) {
    cardSubmitHandler(evt);
  }
  });

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
popupEdit.addEventListener('click', closeWithClick);
popupAdd.addEventListener('click', closeWithClick);
popupImage.addEventListener('click', closeWithClick);




