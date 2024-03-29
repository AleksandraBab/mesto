class Card {

  constructor({cardSelector, config, handleCardClick, handleLikeClick, handleDelClick, userId}) {
    this._template = document.querySelector(cardSelector).content;
    this._link = config.link;
    this._name = config.name;
    this._ownerId = config.owner._id;
    this._likeCounter = config.likes.length
    this._likeArr = config.likes
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDelClick = handleDelClick;
    this._userId = userId;
  }

  _getTemplate () {
    this._element = this._template.querySelector('.element').cloneNode(true);
  }

  _renderDelElement = () => {
    if (this._ownerId != this._userId) {
      this._element.querySelector('.element__delete-btn').classList.add('element__delete-btn_hidden');
    }
  }

  isLiked = () => {
    return this._likeArr.some(  (element) => {
      return element._id === this._userId;
    })
  }

 _renderLikeElement = () => {
   if (this.isLiked() === true) {
     this._likeCard()
   }    
 }

  generateCard () {
    this._getTemplate();
    this._setEventListeners();

    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = this._name;

    this._element.querySelector('.element__heading').textContent = this._name;
    this._element.querySelector('.element__likecounter').textContent = this._likeCounter;

    this._renderDelElement();
    this._renderLikeElement();

    return this._element;
    
  }

  deleteCard() {
    this._element.remove();
  }

  countLike () {
    this._element.querySelector('.element__likecounter').textContent = this._likeCounter;
  }

  updateLikes = (likeArr) => {
    this._likeArr = likeArr
    this._likeCounter = likeArr.length;
    this.countLike()
    this._likeCard()
  }


  _likeCard() {
    this._element.querySelector('.element__like-btn').classList.toggle('element__like-btn_liked');
  }

  _setEventListeners () {
    const delButton = this._element.querySelector('.element__delete-btn');
    delButton.addEventListener('click', () => this._handleDelClick());

    const likeButton = this._element.querySelector('.element__like-btn');
	  likeButton.addEventListener('click', () => this._handleLikeClick());

    const imageButton = this._element.querySelector('.element__image');
    imageButton.addEventListener('click', () => this._handleCardClick({
      link: this._link,
      name: this._text
    }));

  }
}

export {Card}
