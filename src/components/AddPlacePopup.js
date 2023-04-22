import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  /*Очистим значение инпутов при открытии попапа*/
  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      isShowStatus={props.isShowStatus}
      showStatusText='Сохранение...'
      onSubmit={handleSubmit}
      buttonText='Создать'
    >
      <input className="popup__input popup__input_place"
       type="text"
       id="place"
       name="name" 
       placeholder="Название"
       minLength="2" 
       maxLength="30" 
       value={name || ""} 
       onChange={handleChangeName} required />
      <span className="popup__error" id="place-error"></span>
      <input className="popup__input popup__input_link"
       type="url"
       id="link"
       name="link"
       placeholder="Ссылка на картинку"
       value={link || ""}
       onChange={handleChangeLink} required />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;