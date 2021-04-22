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

  checkFormValidity = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  setEnableButton = (buttonElement) => {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disable = false;
  }

  setDisableButton = (buttonElement) => {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disable = true;
  }

  _toggleButtonState = (buttonElement) => {
    if (this.checkFormValidity()) {
      this.setDisableButton(buttonElement);
    } else {
      this.setEnableButton(buttonElement);
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState (buttonElement);

    this._inputList.forEach ((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    })
  }

  enableValidation = () => {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      this._setEventListeners();
  }

  clearErrorElements = () => {
    this._inputList.forEach(input => this._hideInputError(input));
  }
}
