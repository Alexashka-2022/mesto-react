import React from "react";
import api from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar)
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }} onClick={props.onEditAvatar}>
                    <button type="button" className="profile__image-edit" ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__text">{userDescription}</p>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        return (<Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                        />)
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;