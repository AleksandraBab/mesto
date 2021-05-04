export default class Api {
 constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers            
  }

  getInitialData() {
      return Promise.all([this.getProfileInfo(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 

  getProfileInfo () {
      return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  postItem(newItem) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
       body: JSON.stringify({
        name: newItem.name,
        link: newItem.link
       })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 

  deleteItem(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 

  editProfileInfo (newInfo) {
      return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
       body: JSON.stringify({
        name: newInfo.name,
        about: newInfo.about
       })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 

    editAvatar (newAvatar) {
      return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
       body: JSON.stringify({
        avatar: newAvatar.avatar,
       })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  } 

  setLike (id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }   

  deleteLike (id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers})
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
  }   

}
