import PopupWithForm from "./PopupWithForm.js";

function PopupWithConfirmation(props) {

    /*Сабмит удаления карточки*/
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onCardDelete(props.card);
        props.onClose();
    }

    return (
        <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            buttonText='Да'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseByOverlay={props.onCloseByOverlay}
            onSubmit={handleSubmit}
            isShowStatus={props.isShowStatus}
            showStatusText='Удаление'>
        </PopupWithForm>
    );
}

export default PopupWithConfirmation;