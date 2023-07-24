import React from "react";
import { Link, Switch, Route } from "react-router-dom";

import DeckList from "./DeckList";

function Home() {


  return (
    <>
      <div className="container">
        <Link to="/decks/new" className="btn">+ Create Deck</Link>
        <DeckList />
      </div>
    </>
  );
}

export default Home;
