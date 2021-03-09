const initialCards = [
  {
    name: 'Рускеала',
    link: '../images/ruskeala.jpg'
  },
  {
    name: 'Финский залив',
    link: '../images/finzaliv.jpg'
  },
  {
    name: 'Иркутск',
    link: '../images/irkutsk.jpg'
  },
  {
    name: 'Выборг',
    link: '../images/vyborgsity.jpg'
  },
  {
    name: 'Ленинградская область',
    link: '../images/Lenobl.jpg'
  },
  {
    name: 'Мунку-Сардык',
    link: '../images/munku.jpg'
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
const submitEditButton = formElementEdit.querySelector('.popup__submit-btn_type_edit');;

const popupAdd = document.querySelector('.popup_type_add');
const formElementAdd = document.querySelector('.popup__form_type_add');
const submitAddButton = formElementAdd.querySelector('.popup__submit-btn_type_add');
const closeButtonAdd = document.querySelector('.popup__close-btn_place_add');

const popupImage = document.querySelector('.popup_type_image');
const popupPic = popupImage.querySelector('.popup__image');
const popupName = popupImage.querySelector('.popup__caption');
const closeButtonImage = popupImage.querySelector('.popup__close-btn_place_image');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {
  openPopup(popupEdit);

  nameInput.value = nameProfile.textContent;
  captionInput.value = caption.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  caption.textContent = captionInput.value;

  closePopup(popupEdit);
}

function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like-btn_liked');
  eventTarget.classList.add('element__like-btn_blocked');
  eventTarget.addEventListener('mouseout', () => {
    eventTarget.classList.remove('element__like-btn_blocked')
  });
}

function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('.element');
  cardItem.remove();
}

function openImage(evt) {
  const eventTarget = evt.target;
  popupPic.src = eventTarget.src;
  popupName.textContent = eventTarget.alt;

  openPopup(popupImage);
}

function addTaskListeners(card) {
	const likeButton = card.querySelector('.element__like-btn');
	likeButton.addEventListener('click', likeCard);

  const deleteButton = card.querySelector('.element__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const imageButton = card.querySelector('.element__image');
  imageButton.addEventListener('click', openImage);
}

function createCardDomNode(item) {
  const newItem = cardTemplate.content.cloneNode(true);

  const cardName = newItem.querySelector('.element__heading');
  cardName.textContent = item.name;
  const cardImage = newItem.querySelector('.element__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

	return newItem;
}

function renderCards() {
	const result = initialCards.map(function(item) {
		const newCard = createCardDomNode(item);
    addTaskListeners(newCard);
		return newCard;
	});

	cardContainer.append(...result);
}

function cardSubmitHandler(evt) {
  evt.preventDefault();

  const placeInput = formElementAdd.querySelector('.popup__input_type_place');
  const cardName = placeInput.value;
  const placeSrc = formElementAdd.querySelector('.popup__input_type_src');
  const cardLink = placeSrc.value;

  const newCard = createCardDomNode({name: cardName, link: cardLink});
  addTaskListeners(newCard);

  cardContainer.prepend(newCard);
  placeInput.value = '';
  placeSrc.value = '';

  closePopup(popupAdd);
}

formElementEdit.addEventListener('submit', formSubmitHandler);
formElementAdd.addEventListener('submit', cardSubmitHandler);

editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

renderCards();

