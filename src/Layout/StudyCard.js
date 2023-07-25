import React, { useState } from "react";


function StudyCard({ card, cardIndex, deckLength, handleNextCard }) {

  const frontSide = card.front;
  const backSide = card.back;

  const [side, setSide] = useState(frontSide);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setSide((currentSide) => (currentSide === frontSide ? backSide : frontSide));
    setFlipped(true); // Set flipped to true after the card is flipped
  };
  
  return (
    <>
      <h2>Card {cardIndex + 1} of {deckLength}</h2>
      <h4>{side}</h4>
      {flipped ? ( // Render the "next" button when the card is flipped
        <>
          <button className="btn btn-primary" onClick={handleFlip}>
            Flip
          </button>
          <button className="btn btn-primary" onClick={handleNextCard}>
            Next Card
          </button>
        </>
      ) : ( // Otherwise, render the "flip" button
        <button className="btn btn-primary" onClick={handleFlip}>
          Flip
        </button>
      )}    
    </>
  );

}

export default StudyCard;
