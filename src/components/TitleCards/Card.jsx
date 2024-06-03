import React, { useState } from 'react'
import CardInfoPopup from '../CardInfoPopup/CardInfoPopup';

const Card = ({ card }) => {
    const [isVisibleInfo, setIsVisibleInfo] = useState(false);

    const handleInfoClick = () => {
      setIsVisibleInfo(!isVisibleInfo);
    };
  
    return (
      <div className="card" onClick={handleInfoClick}>
        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
        <div className="card-overlay">
          <h3>{card.original_title}</h3>
          <p>Rating: {card.vote_average}</p>
          <p>Release Date: {card.release_date}</p>
        </div>
        {isVisibleInfo && (
          <CardInfoPopup
            movieID={card.id}
            title={card.original_title}
            rating={card.vote_average}
            release={card.release_date}
            img={card.backdrop_path}
            description={card.overview}
            handleClose={handleInfoClick}
          />
        )}
      </div>
    );
  };

export default Card
