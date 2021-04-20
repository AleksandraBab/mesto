export default class UserInfo {
  constructor({nameSelector, captionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
  }

  getUserInfo () {
    this._user = {};
    this._user.userName =  this._name.textContent;
    this._user.userCaption =  this._caption.textContent;

    return this._user;
  }

  setUserInfo (newName, newCaption) {
    this._name.textContent = newName;
    this._caption.textContent = newCaption;
  }
}

