import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

import FormCard from "./FormCard";
import ErrorMessage from "./ErrorMessage";

function FormEditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState([]);
  const [error, setError] = useState(undefined);  

  const initialFormState = {
    front: card.front,
    back: card.back,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);


  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal)
      .then((selectedCard) => {
        if (selectedCard) {
          setCard(selectedCard);
          setFormData({
            front: selectedCard.front,
            back: selectedCard.back,
          });
        } else {
          setError("Deck not found.");
        }
      })
      .catch(setError);
    return () => abortController.abort();
  }, [cardId]);



  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });    
  }
  

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const result = window.confirm("Are you sure you want to update this post?");
    if (result) {
      try {
        const updatedCard = { ...card, ...formData };
        await updateCard(updatedCard);
        setDeck(updatedCard);
        history.push(`/decks/${deckId}/`); // once saved, send user to deck page.
      } catch (error) {
        setError("Failed to update card.");
      }
    } else {
      history.push(`/decks/${deckId}/`); // if cancel, send user to deck page.
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}/`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active">Edit Card {card.id}</li>
      </ol>
      <form name="edit" onSubmit={handleEditSubmit}>
        <FormCard handleChange={handleChange} formData={formData} />
        <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  )
}

export default FormEditCard;
