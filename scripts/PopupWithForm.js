import Popup from '../scripts/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form')
    this._submitForm = submitForm;
  }

  close () {
    super.close();
    this._formElement.reset()
  }

  _getInputValues () {
    this._inputList = this._formElement.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
    //_getInputValues = {author: 'value', job: 'value'};
  }

  setEventListeners () {
    this._formElement.addEventListener('submit', evt => {
        evt.preventDefault()

        this._submitForm(this._getInputValues())
      }
    )

    super.setEventListeners();
  }

}

