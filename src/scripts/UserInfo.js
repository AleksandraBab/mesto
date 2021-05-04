export default class UserInfo {
  constructor({nameSelector, captionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
    this._avatar = document.querySelector(avatarSelector);
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

  setAvatar(newAvatar) {
    this._avatar.src = newAvatar;
    this._avatar.alt = this._name.textContent;
  }
}

