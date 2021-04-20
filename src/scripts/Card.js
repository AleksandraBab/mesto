class Card {

  constructor(config, handleCardClick) {
    this._template = document.querySelector('.template-card').content;
    this._link = config.link;
    this._name = config.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate () {
    this._element = this._template.querySelector('.element').cloneNode(true);
  }

  generateCard () {
    this._getTemplate();
    this._setEventListeners();

    this._image = this._element.querySelector('.element__image');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__heading').textContent = this._name;

    return this._element;
  }

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  }

  _likeCard(evt) {
    evt.target.classList.toggle('element__like-btn_liked');
  }

  _setEventListeners () {
    const delButton = this._element.querySelector('.element__delete-btn');
    delButton.addEventListener('click', this._deleteCard);

    const likeButton = this._element.querySelector('.element__like-btn');
	  likeButton.addEventListener('click', this._likeCard);

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', () => this._handleCardClick({
      link: this._link,
      name: this._text
    }));

  }
}

export {Card}
