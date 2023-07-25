import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";

import ErrorMessage from "./ErrorMessage";
import CardList from "./CardList";

export const ViewDeck = () => {

  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  const history = useHistory();
  const handleDelete = async (id) => {
  const result = window.confirm("Are you sure you want to delete this post?");
    if (result) {
        await deleteDeck(id);
        history.push("/");// After the post is deleted, send the user to the home page.
    }
  };

  
  
  return (
    <section className="container">

      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>

      {error ? (
        <ErrorMessage error={error}>
          <p>
            <Link to={`/`}>Return Home</Link>
          </p>
        </ErrorMessage>
      ) : deck.id ? (
        <>
          <article>
            <div>
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
              <div className="flexBtn">
                <div>
                  <Link to={`/decks/${deck.id}/edit`}>Edit</Link>
                  <Link to={`/decks/${deck.id}/study`}>Study</Link>
                  <Link to={`/decks/${deck.id}/cards/new`}>+ Add Cards</Link>
                </div>
                <div>
                  <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article>
          <h2>Cards</h2>
            <CardList deck={deck} />
          </article>
        </>
      ) : (
        <div className="p-4 border border-top-0">
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
}

export default ViewDeck;
