import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteCard } from "../utils/api";

import CardItem from "./CardItem";
import ErrorMessage from "./ErrorMessage";

export const CardList = ({ deckId }) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();

  console.log(deckId);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((decks) => {
         // Find the deck with the specified deckId
        const selectedDeck = decks.find((deck) => deck.id === parseInt(deckId));
        if (selectedDeck) {
          // Set the cards for the selected deck
          setCards(selectedDeck.cards);
         } else {
          setError("Deck not found.");
        }
      })
      .catch(setError);
  
    return () => abortController.abort();
  }, [deckId]);
  
  if (error) {
    return <ErrorMessage error={error} />;
  }


  const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this card?");
      if (result) {
        await deleteCard(id);
        // Update the state of the component with the new list of decks
        window.location.reload();
        //history.push(`/decks/${deckId}`);// After the post is deleted, send the user to the deck.
      }
    };

  const list = cards.map((card) => <CardItem deckId={deckId} key={card.id} card={card} handleDelete={handleDelete} />);
  
  return (
    <main className="container">
      <section className="row">
        {list}
      </section>
    </main>
  );

}

export default CardList;