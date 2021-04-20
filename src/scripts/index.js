import '../pages/index.css';

import {Card} from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js'
import {editButton, addButton, formElementEdit, submitAddButton, nameInput, captionInput, submitEditButton, formElementAdd} from '../scripts/constants.js'
import {initialCards} from '../scripts/initialCards.js'
import {config} from '../scripts/config.js'
import PopupWithForm from '../scripts/PopupWithForm.js'
import PopupWithImage from '../scripts/PopupWithImage.js'
import UserInfo from '../scripts/UserInfo.js'
import Section from '../scripts/Section.js'


/* Валидируем формы*/

const addValidator = new FormValidator (config, formElementAdd);
const editValidator = new FormValidator (config, formElementEdit);

addValidator.enableValidation();
editValidator.enableValidation()


/* Работаем с карточками */

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const createCard = (obj) => {
  const card = new Card(obj, () =>
    popupImage.open({link: obj.link, name: obj.name}));
  return card.generateCard();
}

const cardsList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements__grid-items')

cardsList.renderItems();

/* Попап редактирования */

const userInfo = new UserInfo ({nameSelector: '.profile__name', captionSelector:'.profile__caption'})

const popupEdit = new PopupWithForm('.popup_type_edit', (formData) => {
  if (!editValidator.checkFormValidity()) {
    userInfo.setUserInfo(formData.author, formData.job);
    //formData = {author: 'value', job: 'value'};
    popupEdit.close();
  }
  }
);

popupEdit.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfoObject = userInfo.getUserInfo()
  nameInput.value = userInfoObject.userName;
  captionInput.value = userInfoObject.userCaption;

  editValidator.setAbleButton(submitEditButton)
  editValidator.clearErrorElements();
  popupEdit.open()
});

/* Попап добавления */

const popupAdd = new PopupWithForm('.popup_type_add', (dataForm) => {
  if (!addValidator.checkFormValidity()) {
    const cardElement = createCard({link: dataForm.photo, name: dataForm.place});
    cardsList.addNextItem(cardElement);

    popupAdd.close()
  }
});

popupAdd.setEventListeners();


addButton.addEventListener('click', () => {

    addValidator.setDisableButton(submitAddButton)
    addValidator.clearErrorElements();
    popupAdd.open();
});





