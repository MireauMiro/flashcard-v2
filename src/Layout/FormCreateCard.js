import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import FormCard from "./FormCard";

function FormCreateCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);

  console.log(deckId);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  console.log(deckId);

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };
  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const { front, back } = formData;
    const card = { front, back };
    createCard(deckId, card);
    setFormData({ ...initialFormState });
  };

  return (
    <>

      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item active">Create Card</li>
      </ol>
    <form name="create" onSubmit={handleCreateSubmit}>
      <FormCard handleChange={handleChange} formData={formData} />
      <button type="button" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
      <button type="submit" className="btn btn-primary">Add Card</button>
    </form>
  </>
  );
}

export default FormCreateCard;
