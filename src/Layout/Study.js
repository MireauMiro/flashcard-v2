import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

import StudyCard from "./StudyCard";
import NotEnough from "./NotEnough";
import ErrorMessage from "./ErrorMessage";

function Study() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDeck = async () => {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
        if (deck.cards.length > 0) {
          setCurrentCard(deck.cards[0]);
        } else {
          setCurrentCard(null); // Reset currentCard if there are no cards in the deck
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDeck();
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleNextCard = () => {
    setCurrentCard((prevCard) => {
      let currentIndex = deck.cards.indexOf(prevCard);
      const nextIndex = currentIndex + 1;
      if (nextIndex >= deck.cards.length) {
        const result = window.confirm("Return to first card?");
        if (result) {
          return deck.cards[0]; // Return the first card
        }
      }
      return nextIndex < deck.cards.length ? deck.cards[nextIndex] : prevCard;
    });
  };

  const handlePrevCard = () => {
    setCurrentCard((prevCard) => {
      let currentIndex = deck.cards.indexOf(prevCard);
      const nextIndex = currentIndex - 1;
      return nextIndex >= 0 ? deck.cards[nextIndex] : prevCard;
    });
  };
  



  return (
    <>
      {deck?.cards?.length < 3 ? (
        <>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
          <div className="container">
            <h2>{deck.name}</h2>
            <Route>
              <NotEnough />
            </Route>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
          </div>
        </>
      ) : (
        <>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
          <div className="container">
            <h2>Study: {deck.name}</h2>
            <article>
              {currentCard ? (
                <>
                  <StudyCard handleNextCard={handleNextCard} deckId={deckId} key={currentCard.id} card={currentCard} deckLength={deck.cards.length} cardIndex={deck.cards.indexOf(currentCard)} />
                </>
              ) : (
                <p>No cards found in the deck.</p>
              )}
            </article>
          </div>
        </>
        )}
      </>
    );
  }

export default Study;
