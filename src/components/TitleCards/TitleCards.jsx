import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import play_icon from '../../assets/play_icon.png';
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const cardListRef = useRef(null);
  const leftButtonRef = useRef(null);
  const titleCardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };

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

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='title-cards' >
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list-wrapper" ref={titleCardsRef}>
        <button onClick={scrollLeft} className='scroll-button-left' ref={leftButtonRef}>
          <img src={play_icon} className='more-cards-icon' alt="Scroll" />
        </button>
        <div className="card-list" ref={cardListRef}>
          {apiData.map((card, index) => {
            return (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.name} />
                <div className="card-overlay">
                  <h3>{card.original_title}</h3>
                  <p>Rating: {card.vote_average}</p>
                  <p>Release Date: {card.release_date}</p>
                  <p>{card.overview}</p>
                </div>
              </Link>
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
