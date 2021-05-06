import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__caption');
  }

  open ({ link, name }) {

    this._popupPic.src = link;
    this._popupName.alt = name;
    this._popupName.textContent = name;

    super.open();
  }
}
