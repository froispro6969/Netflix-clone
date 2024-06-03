import React, { useContext } from 'react';
import './CardInfoPopup.css';
import { useNavigate } from 'react-router-dom';

const CardInfoPopup = ({ id,title, rating, release, handleClose, img, description }) => {

  const navigate = useNavigate();
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="popupBtn" onClick={handleClose}>Close</button>
        <div className='card-info-popup-image'>
          <img src={`https://image.tmdb.org/t/p/w500${img}`}></img>
          <button onClick={() => {navigate(`/player/${id}`)}}>PLAY</button>
          <button>Add to list</button>
        </div>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <p style={{ color: "lightgreen" }}>Rating: {rating}</p>
        <p>Release Date: {release}</p>
        <h2 style={{ marginTop: "20px", marginLeft: "0px" }}>Description</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardInfoPopup;
