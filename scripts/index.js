import {Card, popupImage} from '../scripts/Card.js'
import {openPopup, closePopup, closeWithClick} from '../scripts/utils.js'
import FormValidator from '../scripts/FormValidator.js'
import {cardContainer, editButton, addButton, nameProfile, caption, popupEdit, formElementEdit, nameInput, captionInput, submitEditButton, popupAdd, formElementAdd, placeInput, placeSrc, submitAddButton} from '../scripts/constants.js'
import {initialCards} from '../scripts/initialCards.js'
import {config} from '../scripts/config.js'


/* Валидируем формы*/

const addValidator = new FormValidator (config, formElementAdd);
const editValidator = new FormValidator (config, formElementEdit);

addValidator.enableValidation();
editValidator.enableValidation()

/* Работаем с попапами */

const openPopupAdd = () => {
  placeInput.value = '';
  placeSrc.value = '';

  addValidator.setDisableButton(submitAddButton)
  addValidator.clearErrorElements();
  openPopup(popupAdd);
}

const openPopupEdit = () => {
  nameInput.value = nameProfile.textContent;
  captionInput.value = caption.textContent;

  editValidator.setAbleButton(submitEditButton)
  editValidator.clearErrorElements();
  openPopup(popupEdit);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  caption.textContent = captionInput.value;

  closePopup(popupEdit);
}

/* Работаем с карточками */
const createCard = (obj) => {
  const card = new Card(obj);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  cardContainer.append(cardElement);
});

const cardSubmitHandler = (evt) => {
  evt.preventDefault();

  const cardElement = createCard({name: placeInput.value, link: placeSrc.value});

  cardContainer.prepend(cardElement)

  closePopup(popupAdd);
  formElementAdd.reset();
}

/* Вызываем события */

formElementEdit.addEventListener('submit', (evt) => {
  if (!editValidator.checkFormValidity()) {
    formSubmitHandler(evt);
  }
  });

formElementAdd.addEventListener('submit', (evt) => {
  if (!addValidator.checkFormValidity()) {
    cardSubmitHandler(evt);
  }
  });

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
popupEdit.addEventListener('click', closeWithClick);
popupAdd.addEventListener('click', closeWithClick);
popupImage.addEventListener('click', closeWithClick);




