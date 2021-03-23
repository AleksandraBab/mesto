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

const cardContainer = document.querySelector('.elements__grid-items');
const cardTemplate = document.querySelector('.template-card');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const nameProfile = document.querySelector('.profile__name');
const caption = document.querySelector('.profile__caption');

const popupEdit = document.querySelector('.popup_type_edit');
const closeButtonEdit = document.querySelector('.popup__close-btn_place_edit');
const formElementEdit = document.querySelector('.popup__form_type_edit');
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const captionInput = formElementEdit.querySelector('.popup__input_type_caption')

const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const submitAddButton = formElementAdd.querySelector('.popup__submit-btn_type_add');
const placeInput = formElementAdd.querySelector('.popup__input_type_place');
const placeSrc = formElementAdd.querySelector('.popup__input_type_src');
const closeButtonAdd = document.querySelector('.popup__close-btn_place_add');

const popupImage = document.querySelector('.popup_type_image');
const popupPic = popupImage.querySelector('.popup__image');
const popupName = popupImage.querySelector('.popup__caption');
const closeButtonImage = popupImage.querySelector('.popup__close-btn_place_image');

/* Работаем с попапами */

const clearErrorElements = (formElement) => {
  const errorList = Array.from(formElement.querySelectorAll('.popup__error'));
  errorList.forEach ((error) => {
    error.classList.remove('popup__error_active')
  });

  const errorInputList = Array.from(formElement.querySelectorAll('.popup__input'));
  errorInputList.forEach ((error) => {
    error.classList.remove('popup__input_type_error')
  });
}

const switchButton = (formElement) => {
  const buttonElement = formElement.querySelector('.popup__submit-btn');
  buttonElement.classList.remove('popup__submit-btn_disabled');
}

const closeWithClick = (evt) => {
  const popup = document.querySelector('.popup_opened');

  if (evt.target.classList.contains('popup')) {
    closePopup(popup)
 }
}

const closeWithEsc = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popup)
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeWithEsc);
}

const openPopupAdd = () => {
  placeInput.value = '';
  placeSrc.value = '';

  clearErrorElements(formElementAdd);
  openPopup(popupAdd);
}

const openPopupEdit = () => {
  nameInput.value = nameProfile.textContent;
  captionInput.value = caption.textContent;

  clearErrorElements(formElementEdit);
  switchButton(formElementEdit);
  openPopup(popupEdit);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeWithEsc);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  caption.textContent = captionInput.value;

  closePopup(popupEdit);
}

/* Работаем с карточками */

const likeCard = (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like-btn_liked');
  eventTarget.classList.add('element__like-btn_blocked');
  eventTarget.addEventListener('mouseout', () => {
    eventTarget.classList.remove('element__like-btn_blocked')
  }, { once: true });
}

const deleteCard = (evt) => {
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('.element');
  cardItem.remove();
}

const openImage = (evt) => {
  const eventTarget = evt.target;
  popupPic.src = eventTarget.src;
  popupName.textContent = eventTarget.alt;

  openPopup(popupImage);
}

const addTaskListeners = (card) => {
	const likeButton = card.querySelector('.element__like-btn');
	likeButton.addEventListener('click', likeCard);

  const deleteButton = card.querySelector('.element__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const imageButton = card.querySelector('.element__image');
  imageButton.addEventListener('click', openImage);
}

const createCardDomNode = (item) => {
  const newItem = cardTemplate.content.cloneNode(true);

  const cardName = newItem.querySelector('.element__heading');
  cardName.textContent = item.name;
  const cardImage = newItem.querySelector('.element__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  addTaskListeners(newItem);

	return newItem;
}

const renderCards = () => {
	const result = initialCards.map(function(item) {
		const newCard = createCardDomNode(item);

		return newCard;
	});

	cardContainer.append(...result);
}

const cardSubmitHandler = (evt) => {
  evt.preventDefault();

  const cardName = placeInput.value;
  const cardLink = placeSrc.value;

  const newCard = createCardDomNode({name: cardName, link: cardLink});
  addTaskListeners(newCard);

  cardContainer.prepend(newCard);
  placeInput.value = '';
  placeSrc.value = '';

  closePopup(popupAdd);
}

/* Вызываем события */

formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', cardSubmitHandler);

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));
popupEdit.addEventListener('click', closeWithClick);
popupAdd.addEventListener('click', closeWithClick);
popupImage.addEventListener('click', closeWithClick);

renderCards();

