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

const popupImage = document.querySelector('.popup_type_image');
const popupPic = popupImage.querySelector('.popup__image');
const popupName = popupImage.querySelector('.popup__caption');


export {popupImage, popupPic, popupName, cardContainer, editButton, addButton, nameProfile, caption, popupEdit, formElementEdit, nameInput, captionInput, submitEditButton, popupAdd, formElementAdd, placeInput, placeSrc, submitAddButton}
