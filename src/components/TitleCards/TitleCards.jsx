import React, { useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import play_icon from '../../assets/play_icon.png';

const TitleCards = ({title, category}) => {
  const cardListRef = useRef(null);
  const leftButtonRef = useRef(null);
  const titleCardsRef = useRef(null);

  const scrollRight = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: 1500, behavior: 'smooth' });
    }
    leftButtonRef.current.style.display = 'block';
    titleCardsRef.current.style.marginLeft = 0;
  };
  const scrollLeft = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: -1500, behavior: 'smooth' });
    }
  };

  return (
    <div className='titlecards' >
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list-wrapper" ref={titleCardsRef}>
        <button onClick={scrollLeft} className='scroll-button-left' ref={leftButtonRef}>
          <img src={play_icon} className='more-cards-icon' alt="Scroll" />
        </button>
        <div className="card-list" ref={cardListRef}>
          {cards_data.map((card, index) => {
            return (
              <div className="card" key={index}>
                <img src={card.image} alt={card.name} />
                <p>{card.name}</p>
              </div>
            );
          })}
        </div>
        <button onClick={scrollRight} className='scroll-button-right'>
          <img src={play_icon} className='more-cards-icon' alt="Scroll" />
        </button>
      </div>
    </div>
  );
};

export default TitleCards;
