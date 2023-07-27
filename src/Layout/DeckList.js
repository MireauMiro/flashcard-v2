import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

import DeckItem from "./DeckItem";
import ErrorMessage from "./ErrorMessage";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();


  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }


  const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this post?");
      if (result) {
        await deleteDeck(id);
        await listDecks().then(setDecks).catch(setError);
        history.push("/");// After the post is deleted, send the user to the home page.
      }
    };


  const list = decks.map((deck) => <DeckItem key={deck.id} deck={deck} handleDelete={handleDelete} />);

  return (
    <main className="container">
      <section className="row">
        {list}
      </section>
    </main>
  );

}

export default DeckList;
