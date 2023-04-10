function Card(props) {
    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="element">
            <button type="button" className="element__delete"></button>
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button type="button" className="element__like"></button>
                    <p className="element__likes-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;