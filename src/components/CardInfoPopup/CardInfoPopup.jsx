import React from 'react';
import './CardInfoPopup.css';

const CardInfoPopup = ({ title, rating, release, handleClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="popupBtn" onClick={handleClose}>Close</button>
        <h3>{title}</h3>
        <p>Rating: {rating}</p>
        <p>Release Date: {release}</p>
      </div>
    </div>
  );
};

export default CardInfoPopup;
