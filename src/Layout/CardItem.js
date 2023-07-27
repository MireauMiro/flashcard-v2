import React from "react";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

function CardItem({ deck, card, handleCardDelete }) {
  if (card) {
    return (
    <>
      <article>
        <div>
          <h2>Card: {card.id}</h2>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <div className="flexBtn">
            <div>
              <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>Edit</Link>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => handleCardDelete(card.id)}>
                Delete 
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
    );
  }
  return <NotFound />;
}

export default CardItem;
