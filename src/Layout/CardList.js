import React from "react";
import { deleteCard } from "../utils/api";

import CardItem from "./CardItem";

export const CardList = ({ deck }) => {

  const handleCardDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this card?");
      if (result) {
        await deleteCard(id);
        // Update the state of the component with the new list of decks
        window.location.reload();
      }
    };

    const list = deck.cards.map((card) => (
      <CardItem deck={deck} key={card.id} card={card} handleCardDelete={handleCardDelete} />
    ));
  
  return (
    <main className="container">
      <section className="row">
        {list}
      </section>
    </main>
  );

}

export default CardList;