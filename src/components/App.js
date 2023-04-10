import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const isOpen = (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

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

  function closeAllPopupsByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div className='page'>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closeAllPopupsByOverlay}
        buttonText='Сохранить'
      >
        <input className="popup__input popup__input_name" type="text" id="user" name="userName" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className="popup__error" id="user-error"></span>
        <input className="popup__input popup__input_specialization" type="text" id="specialization" name="userData"
          placeholder="Специальность" minLength="2" maxLength="200" required />
        <span className="popup__error" id="specialization-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name='add'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closeAllPopupsByOverlay}
        buttonText='Создать'
      >
        <input className="popup__input popup__input_place" type="text" id="place" name="name" placeholder="Название"
          minlength="2" maxlength="30" required />
        <span className="popup__error" id="place-error"></span>
        <input className="popup__input popup__input_link" type="url" id="link" name="link"
          placeholder="Ссылка на картинку" required />
        <span className="popup__error" id="link-error"></span>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closeAllPopupsByOverlay}
      />
      <PopupWithForm
        name='update'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closeAllPopupsByOverlay}
        buttonText='Сохранить'
      >
        <input className="popup__input popup__input_avatar" type="url" id="avatar-link" name="avatar-link"
          placeholder="Ссылка на фото" required />
        <span className="popup__error" id="avatar-link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name='confirm'
        title='Вы уверены?'
        buttonText='Да'
      />
    </div>
  );
}

export default App;
