import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteDeck } from "../utils/api";


function ViewDeck({ decks }) {

  const { deckId } = useParams();
  const currentDeck = readDeck(deckId);

  const history = useHistory();
  const handleDeckDelete = async (id) => {
  const result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
      await deleteDeck(id);
      history.push("/"); // After the post is deleted, send the user to the home page.
    }
  };

  
  return (
    <>
      <div>
        <h2>{currentDeck.name}</h2>
        <h2>{currentDeck.description}</h2>
        <Link to={`decks/:deckId/edit`}>Edit</Link>
        <Link to={`decks/:deckId/study`}>Study</Link>
        <Link to={`decks/:deckId/cards/new`}>Add Card</Link>
        <button className="btn btn-danger" onClick={() => handleDeckDelete(deck.id)}>
          Delete 
        </button>
      </div>
      <h2>Cards</h2>
      <CardList deckId={deckId} />
    </>
  );
}

export default ViewDeck;
