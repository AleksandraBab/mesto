export default class FormValidator {

  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(config.submitButtonSelector)
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

  setEnableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disable = false;
  }

  setDisableButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disable = true;
  }

  _toggleButtonState = () => {
    if (this.checkFormValidity()) {
      this.setDisableButton(this._submitButton);
    } else {
      this.setEnableButton(this._submitButton);
    }
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState (this._submitButton);

    this._inputList.forEach ((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._submitButton);
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
