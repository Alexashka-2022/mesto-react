import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import api from "../utils/Api.js";
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  /*Стейты состояния открытия попапов*/
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);

  const isOpen = (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirmDeletePopupOpen);

  /*Стейт вывода текста кнопок*/
  const [isShowStatus, setShowStatus] = React.useState(false);

  /*Получаем информацию о текущем пользавателе*/
  React.useEffect(() => {
    api.getUserInfo().then((userInfo) => {
      setCurrentUser(userInfo);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  /*Получаем список карточек*/
  React.useEffect(() => {
    api.getInitialCards().then((cardData) => {
      setCards(cardData);
    }).catch((err) => {
      console.log(err);
    })
  }, []);


  /*Обработка закрытия по клику на кнопку 'Escape'*/
  React.useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }

  }, [isOpen]);


  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  /*Обработка лайков карточек*/
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((res) => {
          setCards((currentState) => currentState.map((item) => (item._id === card._id ? res : item)));
        }).catch((err) => {
          console.log(err);
        })
    } else {
      api.addLike(card._id)
        .then((res) => {
          setCards((currentState) => currentState.map((item) => (item._id === card._id ? res : item)));
        }).catch((err) => {
          console.log(err);
        })
    }
  }

   /*Общая функция закрытия всех попапов по клику на оверлей*/
  function closeAllPopupsByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

   /*Обработка удаление карточек*/
  function handleCardDelete(card) {
    setShowStatus(true);
    api.deleteCard(card._id)
      .then((res) => {
        setCards((currentState) => currentState.filter((item) => item._id !== card._id));
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      })
  }

   /*Обработка обновление информации о пользователе*/
  function handleUpdateUser(userInfo) {
    setShowStatus(true);
    api.editUserInfo(userInfo["name"], userInfo["about"])
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      });
  }

   /*Обработка изменения аватара*/
  function handleUpdateAvatar(userInfo) {
    setShowStatus(true);
    api.editUserAvatar(userInfo["avatar"])
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      })
  }

   /*Обработка сабмита создания новой карточки*/
  function handleAddPlaceSubmit(newCard) {
    setShowStatus(true);
    api.addNewCard(newCard["name"], newCard["link"])
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      });

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardDeleteClick={handleCardDeleteClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
          onUpdateUser={handleUpdateUser}
          isShowStatus={isShowStatus}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
          onAddPlace={handleAddPlaceSubmit}
          isShowStatus={isShowStatus}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isShowStatus={isShowStatus}
        />
        <PopupWithConfirmation
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByOverlay}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          isShowStatus={isShowStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
