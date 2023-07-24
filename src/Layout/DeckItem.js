import React from "react";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

export const DeckItem = ({ deck, handleDelete }) => {

  if (deck) {
    return (
          <article>
            <div>
              <h2>{deck.name} <small>{deck.cards.length} cards</small></h2>
              <p>{deck.description}</p>
              <div className="flexBtn">
                <div>
                  <Link to={`/decks/${deck.id}`}>View</Link>
                  <Link to={`/decks/${deck.id}/study`}>Study</Link>
                </div>
                <div>
                  <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
                    Delete 
                  </button>
                </div>
              </div>
            </div>
          </article>
    );
  }
  return <NotFound />;
};

export default DeckItem;
