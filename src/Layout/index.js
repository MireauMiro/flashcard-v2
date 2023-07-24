import React from "react";

import { Switch, Route, useParams } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import NotFound from "./NotFound";
import Study from "./Study";
import FormCreateCard from "./FormCreateCard";
import FormCreateDeck from "./FormCreateDeck";
import FormEditCard from "./FormEditCard";
import FormEditDeck from "./FormEditDeck";
import ViewDeck from "./ViewDeck";

function Layout() {

  const { deckId, cardId } = useParams();

  return (
    <>
      <Header />
      <div className="container">
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path={`/decks/new`}>
            <FormCreateDeck />
          </Route>

          <Route path={`/decks/:deckId/study`}>
            <Study deckId={deckId} />
          </Route>

          <Route path={`/decks/:deckId/edit`}>
            <FormEditDeck deckId={deckId} />
          </Route>

          <Route path={`/decks/:deckId/cards/:cardId/edit`}>
            <FormEditCard deckId={deckId} cardId={cardId} />
          </Route>

          <Route path={`/decks/:deckId/cards/new`}>
            <FormCreateCard deckId={deckId} />
          </Route>

          <Route path={`/decks/:deckId`}>
            <ViewDeck />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
