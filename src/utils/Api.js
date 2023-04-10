class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,
            {
                method: "GET",
                headers: this._headers,
            })
            .then(this._checkStatus);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: "GET",
                headers: this._headers,
            })
            .then(this._checkStatus);
    }

    editUserAvatar(userAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar,
            }),
        })
            .then(this._checkStatus);
    }

    editUserInfo(userName, userAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(this._checkStatus);

    }

    addNewCard(cardName, cardLink) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }).then(this._checkStatus);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkStatus);
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkStatus);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkStatus);
    }
}

    const api = new Api(
    {
      baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
      headers: {
        "content-type": "application/json",
        authorization: "a7b09761-28da-4b57-871e-f84fdfb6fd09",
      },
    });

    export default api;