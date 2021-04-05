export default class FormValidator {

  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = ''
    errorElement.classList.remove(this._errorClass)
  }

  _checkInputValidity = (inputElement) => {
    if(inputElement.validity.valid) {
      this._hideInputError (inputElement);
    } else {
      this._showInputError (inputElement, inputElement.validationMessage);
    }
  }

  checkFormValidity = (inputList) => {
    // если невалидна, вернет true
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  setAbleButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disable = false;
  }

  setDisableButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disable = true;
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this.checkFormValidity(inputList)) {
      this.setDisableButton(buttonElement);
    } else {
      this.setAbleButton(buttonElement);
    }
  }

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState (inputList, buttonElement);

    inputList.forEach ((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    })
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}


