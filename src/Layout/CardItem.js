import React from "react";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

function CardItem({ deckId, card, handleDelete }) {
  if (card) {
    return (
    <>
      <article>
        <div>
          <h2>Card: {card.id}</h2>
          <p>Front: {card.front}</p>
          <p>Back: {card.back}</p>
          <div className="flexBtn">
            <div>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => handleDelete(card.id)}>
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
