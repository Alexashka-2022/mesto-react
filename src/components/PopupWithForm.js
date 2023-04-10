function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={props.onCloseByOverlay}>
            <div className="popup__container">
                <button className={`popup__closed popup__closed-${props.name}`} type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={`${props.name}-form`} noValidate>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;