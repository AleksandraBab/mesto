import Popup from '../scripts/Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form')
  }

  setEventListeners () {
    this._formElement.addEventListener('submit', evt => {
        evt.preventDefault()
        this._submitForm()
      })

    super.setEventListeners();
  }

  setSubmitAction(action) {
    this._submitForm = action;
  }

}
