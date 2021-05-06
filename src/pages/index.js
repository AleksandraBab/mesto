import '../pages/index.css';

import {Card} from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import {submitAvatarButton, avatarBlock, formElementAvatar, editButton, addButton, formElementEdit, submitAddButton, nameInput, captionInput, submitEditButton, formElementAdd} from '../utils/constants.js'
import {renderLoading} from '../utils/utils.js'
import {config} from '../utils/config.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import Api from '../components/Api.js'

/* Инициализация страницы, объявление экземпляров классов */

const userInfo = new UserInfo ({nameSelector: '.profile__name', captionSelector:'.profile__caption', avatarSelector: '.profile__avatar'})

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const popupDel = new PopupWithSubmit('.popup_type_del')
popupDel.setEventListeners();

const cardsList = new Section ({
      renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
    }, '.elements__grid-items')

/* Инициализация страницы, получение данных */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '907f5fd1-4c67-4fa9-95ec-e50adc015db4',
    'Content-Type': 'application/json'
  }
}); 

let userId;

api.getInitialData()
.then( (arg) => {
  const [dataFirtsPromise, dataSecondPromise] = arg;
  userInfo.setUserInfo(dataFirtsPromise.name, dataFirtsPromise.about);
  userInfo.setAvatar(dataFirtsPromise.avatar);
  userId = dataFirtsPromise._id
  cardsList.renderItems(dataSecondPromise);
})
.catch((err) => {
    console.log(err); 
  }); 

/* Валидация форм*/

const addValidator = new FormValidator (config, formElementAdd);
const editValidator = new FormValidator (config, formElementEdit);
const avatarValidator = new FormValidator (config, formElementAvatar);


addValidator.enableValidation();
editValidator.enableValidation();
avatarValidator.enableValidation();


/* Функции для создания карточки */

const createCard = (obj) => {
  const card = new Card({
    cardSelector: '.template-card',
    config: obj, 
    handleCardClick: () => popupImage.open({link: obj.link, name: obj.name}),
    handleLikeClick: () => {
      if (!card.isLiked()) {
        api.setLike(obj._id)
        .then((res) => {
          card.updateLikes(res.likes)
        })
        .catch((err) => {
          console.log(err);
        })} 
      else {
        api.deleteLike(obj._id)
         .then((res) => {
           card.updateLikes(res.likes)
         })
         .catch((err) => {
           console.log(err);
        })  
      }
    },
    handleDelClick: () => {
      popupDel.setSubmitAction(() => {
        api.deleteItem(obj._id)
        .then((res) => {
          card.deleteCard()
          popupDel.close();
        })
        .catch((err) => {
          console.log(err);
        })      
      })

      popupDel.open() 
    },
    userId: userId,
  });
  return card.generateCard();
}

/* Попап редактирования (изменить данные пользователя) */

const popupEdit = new PopupWithForm('.popup_type_edit', (formData) => {
  if (!editValidator.checkFormValidity()) {
    renderLoading(submitEditButton, true);
    api.editProfileInfo({name: formData.author, about: formData.job})
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(submitEditButton, false, 'Сохранить')
    })
    
  }
});

popupEdit.setEventListeners();

editButton.addEventListener('click', () => {
  const userInfoObject = userInfo.getUserInfo()
  nameInput.value = userInfoObject.userName;
  captionInput.value = userInfoObject.userCaption;

  editValidator.setEnableButton()
  editValidator.clearErrorElements();
  popupEdit.open()
});

/* Попап добавления (добавить карточку) */

const popupAdd = new PopupWithForm('.popup_type_add', (dataForm) => {
  if (!addValidator.checkFormValidity()) {
    renderLoading(submitAddButton, true);
    api.postItem({link: dataForm.photo, name: dataForm.place})
    .then((result) => {
      const newCard = createCard(result);
      cardsList.addNextItem(newCard);
      popupAdd.close()
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(submitAddButton, false, 'Создать')
    })
  }
});

popupAdd.setEventListeners();

addButton.addEventListener('click', () => {

    addValidator.setDisableButton()
    addValidator.clearErrorElements();
    popupAdd.open();
});


/* Попап аватара (сменить аватар) */

const popupAvatar = new PopupWithForm('.popup_type_avatar', (formData) => {
  if (!avatarValidator.checkFormValidity()) {
    renderLoading(submitAvatarButton, true);
    api.editAvatar({avatar: formData.avatar})
    .then((result) => {
      userInfo.setAvatar(result.avatar);
      popupAvatar.close()
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(submitAvatarButton, false, 'Сохранить')
    });
  }
});

popupAvatar.setEventListeners();

avatarBlock.addEventListener('click', () => {

    avatarValidator.setDisableButton()
    avatarValidator.clearErrorElements();
    popupAvatar.open();
});
