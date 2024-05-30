import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import play_icon from '../../assets/play_icon.png';
import Card from './Card';

const TitleCards = ({ title, category }) => {
  const cardListRef = useRef(null);
  const leftButtonRef = useRef(null);
  const titleCardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(0);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };

  const calculateCardsPerPage = () => {
    if (cardListRef.current) {
      const card = cardListRef.current.querySelector('.card');
      if (card) {
        const cardWidth = card.offsetWidth;
        const visibleCards = Math.floor(window.innerWidth / cardWidth);
        setCardsPerPage(visibleCards);
      }
    }
  };

  const scrollRight = () => {
    if (cardListRef.current && cardsPerPage > 0) {
      const cardWidth = cardListRef.current.querySelector('.card').offsetWidth;
      cardListRef.current.scrollBy({ left: cardWidth * cardsPerPage, behavior: 'smooth' });
    }
    if (leftButtonRef.current) {
      leftButtonRef.current.style.display = 'block';
    }
  };

  const scrollLeft = () => {
    if (cardListRef.current && cardsPerPage > 0) {
      const cardWidth = cardListRef.current.querySelector('.card').offsetWidth;
      cardListRef.current.scrollBy({ left: -cardWidth * cardsPerPage, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
  }, [category]);

  useEffect(() => {
    calculateCardsPerPage();
    window.addEventListener('resize', calculateCardsPerPage);

    return () => {
      window.removeEventListener('resize', calculateCardsPerPage);
    };
  }, [apiData]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list-wrapper" ref={titleCardsRef}>
        <button onClick={scrollLeft} className='scroll-button-left' ref={leftButtonRef}>
          <img src={play_icon} className='more-cards-icon' alt="Scroll" />
        </button>
        <div className="card-list" ref={cardListRef}>
          {apiData.map((card, index) => (
            <Card
              key={index}
              card={card}
            />
          ))}
        </div>
        <button onClick={scrollRight} className='scroll-button-right'>
          <img src={play_icon} className='more-cards-icon' alt="Scroll" />
        </button>
      </div>
    </div>
  );
};



export default TitleCards;
