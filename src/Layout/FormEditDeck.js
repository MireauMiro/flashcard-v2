import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

import FormDeck from "./FormDeck";
import ErrorMessage from "./ErrorMessage";

function FormEditDeck() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);

  const [formData, setFormData] = useState({
    name: "", // Initialize name with an empty string
    description: "", // Initialize description with an empty string
  });

  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });    
  }

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((selectedDeck) => {
        if (selectedDeck) {
          // Set the deck object to state
          setDeck(selectedDeck);
          // Set the initial form data with the deck name and description
          setFormData({
            name: selectedDeck.name,
            description: selectedDeck.description,
          });
        } else {
          setError("Deck not found.");
        }
      })
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  const history = useHistory();
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const result = window.confirm("Are you sure you want to update this post?");
    if (result) {
        try {
        const updatedDeck = { ...deck, ...formData };
        await updateDeck(updatedDeck);
        setDeck(updatedDeck);
      } catch (error) {
        setError("Failed to update deck.");
      }
    } else {
      history.push(`/decks/${deckId}/`);// After the post is deleted, send the user to the home page.
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
        <li className="breadcrumb-item active">Edit Deck</li>
      </ol>
      <form name="create" onSubmit={handleEditSubmit}>
      <FormDeck handleChange={handleChange} formData={formData} />
      <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  )
}

export default FormEditDeck;
