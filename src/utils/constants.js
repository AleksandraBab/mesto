const cardContainer = document.querySelector('.elements__grid-items');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const avatarBlock = document.querySelector('.profile__avatar-block');

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


const submitDelButton = formElementAdd.querySelector('.popup__submit-btn_type_del');


const formElementAvatar = document.querySelector('.popup__form_type_avatar');
const submitAvatarButton = formElementAvatar.querySelector('.popup__submit-btn_type_avatar');


export {submitAvatarButton, avatarBlock, formElementAvatar, popupImage, cardContainer, editButton, addButton, formElementEdit, nameInput, captionInput, submitEditButton, popupAdd, formElementAdd, placeInput, placeSrc, submitAddButton}
